import path from "path";

import {readFull} from "../../lib";
import {Puzzle} from "../../types";

interface Data {
  raw: string;
}

function readInput(file_path: string): Data {
  const input = readFull(file_path);

  return {
    raw: input,
  };
}

function binary_search(begin: number, end: number, predicate: (mid: number) => boolean): number {
  let left = begin;
  let right = end;

  while (left+1 < right) {
    const mid = left + Math.round((right - left) / 2);
    
    if (predicate(mid)) {
      left = mid;
    } else {
      right = mid;
    }
  }

  return left;
}

function repeat(n: number, times: number): bigint {
  let result = n.toString();
  while (--times) result += n.toString();
  return BigInt(result);
}

function part1(file_path: string, repeat_times: number = 2) {
  const ranges = readInput(file_path).raw
    .split(",")
    .map(range => {
      const [left, right] = range.split("-").map(i => Number(i));
      return [left, right];
    })
    .sort((a, b) => a[0] - b[0]);

  let sum = 0n;
  ranges.map(([left, right]) => {
    const mapping = (index: number)=> {
      return binary_search(0, index, (n) => repeat(n, repeat_times) < BigInt(index));
    };
    return [mapping(left),mapping(right+1)]
  }).map(([start,end]) => {
    Array.from(
      {length: end-start},
      (_, i) => start+1+i)
      .forEach(i => sum += repeat(i,repeat_times));
  });

  return Number(sum);
}

function part2(file_path: string) {
  let sum = 0n;
  [2,3,5,-6,7,-10,11].map(times => {
    sum += times>0 ?
      BigInt(part1(file_path, times))
    :
      BigInt(-part1(file_path, -times));
  });

  return Number(sum);
}

export default <Puzzle> {
  part1,
  part2,
  input_file_path: path.join(__dirname, 'input.txt'),
  part1_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_1.txt'),
      expected_output: '1227775554',
      extra_args: [],
    },
  ],
  part2_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_2.txt'),
      expected_output: '4174379265',
      extra_args: [],
    },
  ],
}