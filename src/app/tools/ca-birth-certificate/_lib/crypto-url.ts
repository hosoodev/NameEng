import { strFromU8, strToU8, zlibSync, unzlibSync } from 'fflate';
import { CA_COUNTY_MAP, COUNTRY_TO_CODE, CODE_TO_COUNTRY } from './mappings';
import type { CertData } from '../CaBirthCertClient';

const toBase64Url = (buf: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromBase64Url = (str: string) => Uint8Array.from(atob(str.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));

async function deriveKey(password: string, salt: Uint8Array) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']);
    return crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: salt as BufferSource, iterations: 100000, hash: 'SHA-256' },
        keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']
    );
}

function optimizeData(form: CertData) {
    const optimized: any = { ...form };
    
    // 1. 카운티 매핑 최적화 (텍스트 -> 코드)
    const reverseCountyMap: Record<string, number> = {};
    Object.entries(CA_COUNTY_MAP).forEach(([code, name]) => {
        reverseCountyMap[name.toLowerCase()] = parseInt(code);
    });

    const topCounty = (form['top-county'] || '').toLowerCase();
    const county5d = (form['5d'] || '').toLowerCase();

    if (reverseCountyMap[topCounty]) optimized['top-county'] = reverseCountyMap[topCounty];
    if (reverseCountyMap[county5d]) optimized['5d'] = reverseCountyMap[county5d];

    // 2. 국가 코드 최적화
    if (COUNTRY_TO_CODE[form['7']]) optimized['7'] = COUNTRY_TO_CODE[form['7']];
    if (COUNTRY_TO_CODE[form['10']]) optimized['10'] = COUNTRY_TO_CODE[form['10']];

    // 3. 부모 관계 최적화 (12B)
    if (["부", "아버지", "Father"].includes(form['12b'])) optimized['12b'] = 1;
    else if (["모", "어머니", "Mother"].includes(form['12b'])) optimized['12b'] = 2;

    // 4. 포인터 트릭 (중복 이름 제거)
    const fatherName = `${form['6c'] || ''}${form['6a'] || ''}`.trim();
    const motherName = `${form['9c'] || ''}${form['9a'] || ''}`.trim();

    if (form['12a'] === fatherName && fatherName !== "") optimized['12a'] = "F";
    else if (form['12a'] === motherName && motherName !== "") optimized['12a'] = "M";

    if (form['t-name'] === fatherName && fatherName !== "") optimized['t-name'] = "F";
    else if (form['t-name'] === motherName && motherName !== "") optimized['t-name'] = "M";

    return optimized;
}

function restoreData(opt: any) {
    const restored: any = { ...opt };
    
    // 1. 카운티 복구
    if (typeof opt['top-county'] === 'number' && CA_COUNTY_MAP[opt['top-county']]) {
        restored['top-county'] = CA_COUNTY_MAP[opt['top-county']];
    }
    if (typeof opt['5d'] === 'number' && CA_COUNTY_MAP[opt['5d']]) {
        restored['5d'] = CA_COUNTY_MAP[opt['5d']];
    }

    // 2. 국가 코드 복구
    if (CODE_TO_COUNTRY[opt['7']]) restored['7'] = CODE_TO_COUNTRY[opt['7']];
    if (CODE_TO_COUNTRY[opt['10']]) restored['10'] = CODE_TO_COUNTRY[opt['10']];

    // 3. 부모 관계 복구
    if (opt['12b'] === 1) restored['12b'] = "부";
    if (opt['12b'] === 2) restored['12b'] = "모";

    // 4. 포인터 트릭 복구
    const fatherName = `${restored['6c'] || ''}${restored['6a'] || ''}`.trim();
    const motherName = `${restored['9c'] || ''}${restored['9a'] || ''}`.trim();

    if (opt['12a'] === "F") restored['12a'] = fatherName;
    else if (opt['12a'] === "M") restored['12a'] = motherName;

    if (opt['t-name'] === "F") restored['t-name'] = fatherName;
    else if (opt['t-name'] === "M") restored['t-name'] = motherName;

    return restored;
}

export async function encryptPayload(formData: CertData, password: string): Promise<string> {
    const optimized = optimizeData(formData);
    const compressed = zlibSync(strToU8(JSON.stringify(optimized)));
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv as BufferSource }, key, compressed as BufferSource);

    const payload = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    payload.set(salt, 0); 
    payload.set(iv, salt.length); 
    payload.set(new Uint8Array(encrypted), salt.length + iv.length);
    return toBase64Url(payload.buffer);
}

export async function decryptPayload(token: string, password: string): Promise<CertData> {
    const payload = fromBase64Url(token);
    const salt = payload.slice(0, 16); 
    const iv = payload.slice(16, 28); 
    const encrypted = payload.slice(28);
    const key = await deriveKey(password, salt);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv as BufferSource }, key, encrypted as BufferSource);
    return restoreData(JSON.parse(strFromU8(unzlibSync(new Uint8Array(decrypted)))));
}
