import path from "path";

import { readFull } from "../../lib";
import { Puzzle } from "../../types";

interface Data {
  raw: string;
}

function readInput(file_path: string): Data {
  const input = readFull(file_path);

  return {
    raw: input,
  };
}

function part1(file_path: string) {
  const data = readInput(file_path);
  let sum = 50;
  let ans = 0;
  const arr = data.raw
    .split('\n')
    .map(n => {
    const flag = n[0] === 'L' ? -1 : 1;
    return flag * parseInt(n.slice(1));
    });
  arr.forEach((n) => {
    sum += n;
    sum %= 100;
    if (sum === 0) {
      ans++;
    }
  })
  return ans;
}

function part2(file_path: string) {
  const data = readInput(file_path);
  let sum = 50;
  let ans = 0;
  const arr = data.raw
    .split('\n')
    .map(n => {
      const flag = n[0] === 'L' ? -1 : 1;
      return flag * parseInt(n.slice(1));
    });
  arr.forEach((n) => {
    let next = sum + n;
    const roundFn = next > sum ? Math.floor : Math.ceil;
    ans += Math.abs(roundFn(next/100) - roundFn(sum/100));
    while (next<0) next += 100;
    sum = next;
  })
  return ans;
}

export default <Puzzle> {
  part1,
  part2,
  input_file_path: path.join(__dirname, 'input.txt'),
  part1_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_1.txt'),
      expected_output: '3',
      extra_args: [],
    },
  ],
  part2_tests: [
    {
      input_file_path: path.join(__dirname, 'input_test_2.txt'),
      expected_output: '6',
      extra_args: [],
    },
  ],
}