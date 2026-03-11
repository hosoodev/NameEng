/**
 * 미국 이름 CSV → JSON 변환 스크립트
 *
 * 사용법: npx tsx scripts/convert-names.ts
 * CSV가 업데이트될 때만 1회 실행. 결과물은 git에 커밋.
 *
 * 입력: src/data/names/us/names_all.csv
 * 출력: src/data/names/us/
 *        ├── index.json
 *        ├── by-year/2024.json ...
 *        └── by-name/james.json ...
 */

import { createReadStream } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { parse } from 'csv-parse'

// ── 타입 정의 ────────────────────────────────────────────

interface RawRow {
    year: number
    rank: number
    male_name: string
    male_count: number
    female_name: string
    female_count: number
}

interface ByYearEntry {
    rank: number
    m: string   // male_name
    mc: number  // male_count
    f: string   // female_name
    fc: number  // female_count
}

interface ByNameEntry {
    y: number   // year
    r: number   // rank
    c: number   // count
}

interface ByNameFile {
    name: string
    male: ByNameEntry[]
    female: ByNameEntry[]
}

interface IndexEntry {
    n: string   // name
    g: 'M' | 'F' | 'U'  // gender (Unisex)
    lr: number  // latest rank (2024)
    py: number  // peak year
    pr: number  // peak rank
    my: number  // years appeared
}

// ── 설정 ────────────────────────────────────────────────

const INPUT_CSV = 'src/data/names/us/names_all.csv'
const OUTPUT_DIR = 'src/data/names/us'

// ── 메인 ────────────────────────────────────────────────

async function main() {
    console.log('📂 CSV 로딩 중...')
    const data = await loadCSV()
    console.log(`   ${data.length}행 로드 완료`)

    await mkdir(join(OUTPUT_DIR, 'by-year'), { recursive: true })
    await mkdir(join(OUTPUT_DIR, 'by-name'), { recursive: true })

    console.log('📅 by-year/ 생성 중...')
    await generateByYear(data)

    console.log('👤 by-name/ 생성 중...')
    const nameMap = await generateByName(data)

    console.log('📋 index.json 생성 중...')
    await generateIndex(nameMap)

    console.log('')
    console.log('✅ 변환 완료!')
    console.log(`   by-year/ : 145개 파일`)
    console.log(`   by-name/ : ${Object.keys(nameMap).length}개 파일`)
    console.log(`   index.json`)
}

// ── CSV 로드 ─────────────────────────────────────────────

function loadCSV(): Promise<RawRow[]> {
    return new Promise((resolve, reject) => {
        const rows: RawRow[] = []
        createReadStream(INPUT_CSV)
            .pipe(parse({ columns: true, bom: true }))
            .on('data', (row: Record<string, string>) => {
                rows.push({
                    year: Number(row.year),
                    rank: Number(row.rank),
                    male_name: row.male_name,
                    male_count: Number(row.male_count),
                    female_name: row.female_name,
                    female_count: Number(row.female_count),
                })
            })
            .on('end', () => resolve(rows))
            .on('error', reject)
    })
}

// ── by-year JSON 생성 ─────────────────────────────────────

async function generateByYear(data: RawRow[]) {
    const yearMap = new Map<number, ByYearEntry[]>()

    for (const row of data) {
        if (!yearMap.has(row.year)) yearMap.set(row.year, [])
        yearMap.get(row.year)!.push({
            rank: row.rank,
            m: row.male_name,
            mc: row.male_count,
            f: row.female_name,
            fc: row.female_count,
        })
    }

    await Promise.all(
        Array.from(yearMap.entries()).map(([year, rows]) =>
            writeFile(
                join(OUTPUT_DIR, 'by-year', `${year}.json`),
                JSON.stringify(rows.sort((a, b) => a.rank - b.rank))
            )
        )
    )
}

// ── by-name JSON 생성 ─────────────────────────────────────

async function generateByName(data: RawRow[]): Promise<Record<string, ByNameFile>> {
    const nameMap: Record<string, ByNameFile> = {}

    for (const row of data) {
        const m = row.male_name.toLowerCase()
        const f = row.female_name.toLowerCase()

        if (!nameMap[m]) nameMap[m] = { name: m, male: [], female: [] }
        if (!nameMap[f]) nameMap[f] = { name: f, male: [], female: [] }

        nameMap[m].male.push({ y: row.year, r: row.rank, c: row.male_count })
        nameMap[f].female.push({ y: row.year, r: row.rank, c: row.female_count })
    }

    await Promise.all(
        Object.entries(nameMap).map(([name, d]) =>
            writeFile(
                join(OUTPUT_DIR, 'by-name', `${name}.json`),
                JSON.stringify(d)
            )
        )
    )

    return nameMap
}

// ── index.json 생성 ───────────────────────────────────────

async function generateIndex(nameMap: Record<string, ByNameFile>) {
    const index: IndexEntry[] = Object.entries(nameMap).map(([name, d]) => {
        const mTotal = d.male.reduce((sum, e) => sum + e.c, 0)
        const fTotal = d.female.reduce((sum, e) => sum + e.c, 0)

        const g: 'M' | 'F' | 'U' =
            mTotal > fTotal * 3 ? 'M' :
                fTotal > mTotal * 3 ? 'F' : 'U'

        const allEntries = [...d.male, ...d.female]
        const peak = allEntries.reduce((a, b) => a.r <= b.r ? a : b)
        const latest2024 = allEntries.find(e => e.y === 2024)
        const allYears = new Set(allEntries.map(e => e.y))

        return {
            n: name,
            g,
            lr: latest2024?.r ?? 9999,
            py: peak.y,
            pr: peak.r,
            my: allYears.size,
        }
    })

    // 최신 순위 기준 정렬
    index.sort((a, b) => a.lr - b.lr)

    await writeFile(
        join(OUTPUT_DIR, 'index.json'),
        JSON.stringify(index)
    )
}

main().catch(console.error)