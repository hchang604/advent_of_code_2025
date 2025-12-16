import { readFile } from 'fs/promises';

async function readTextFile(): Promise<{ idRanges: string[], ids: string[] }> {
  const content = await readFile('data.txt', 'utf8');

  const splitContent = content.split(/\r?\n/);

  const blankLineIndex = splitContent.indexOf('');
  
  const idRanges = splitContent.slice(0, blankLineIndex);
  const ids = splitContent.slice(blankLineIndex + 1);

  return { idRanges, ids};
}

function updateRanges(ranges: string[], range: string): string[] {
    const min = Number(range.split('-')[0]);
    const max = Number(range.split('-')[1]); 

    const isRangeOutsideAll = ranges.every(r => {
        const rMin = Number(r.split('-')[0]);
        const rMax = Number(r.split('-')[1]);
        return max < rMin && min < rMin || min > rMax && max > rMax;
    });

    if(isRangeOutsideAll) {
        ranges.push(range);
        return ranges;
    }

    for(let i = 0; i < ranges.length; i++) {
        const currentMin = Number(ranges[i].split('-')[0]);
        const currentMax = Number(ranges[i].split('-')[1]);

        if(min < currentMin && max > currentMax) {
            // New range engulfs current range
            ranges[i] = range;
        } else if(min < currentMin && max <= currentMax && max >= currentMin) {
            // New range overlaps the start of current range
            ranges[i] = `${min}-${currentMax}`;
        } else if(min >= currentMin && max > currentMax && min <= currentMax) {
            // New range overlaps the end of current range
            ranges[i] = `${currentMin}-${max}`;
        }
    }

    return ranges;
}

function findDuplicateMin(ranges: string[]): string {
    const seen = new Set<string>();
    
    for(const range of ranges) {
        const min = range.split('-')[0];
        if(seen.has(min)) {
            return min;
        }
        seen.add(min);
    }

    return '';
}

function findDuplicateMax(ranges: string[]): string {
    const seen = new Set<string>();
    
    for(const range of ranges) {
        const max = range.split('-')[1];
        if(seen.has(max)) {
            return max;
        }
        seen.add(max);
    }

    return '';
}

function mergeRanges(ranges: string[]): string[] {
    const duplicateMin = findDuplicateMin(ranges);

    let biggestMax = '-1';

    if(duplicateMin) {
        const newRange = ranges.reduce((acc: string[], cum: string) => {
            const min = cum.split('-')[0];
            
            if(min !== duplicateMin) {
                return [...acc, cum]
            }

            const max = cum.split('-')[1];

            if(Number(max) > Number(biggestMax)) {
                biggestMax = max;
            }

            return [...acc]
        }, [])

        newRange.push(`${duplicateMin}-${biggestMax}`);

        return mergeRanges(newRange);
    }
}

async function solution() {
    const { idRanges } = await readTextFile();

    let processedRanges: string[] = []

    let freshIDsCount = 0;

    

    for(const range of idRanges) {
        const min = Number(range.split('-')[0]);
        const max = Number(range.split('-')[1]);

        if(processedRanges.length === 0) {
            processedRanges.push(range);
        } else {
            processedRanges = updateRanges(processedRanges, range);
        }
    }

    
        console.log(processedRanges);
}

solution();