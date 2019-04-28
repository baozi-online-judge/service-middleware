it(
  {
    example_input: `[2, 7, 11, 15]\n9`,
    expect_output: `[0,1]`
  },
  () => {
    const result = twoSum([2, 7, 11, 15], 9);
    if (Array.isArray(result)) {
      const isPass = result[0] === 0 && result[1] === 1;
      return [isPass, `[${String(result)}]`];
    }
    return [false, result];
  }
);

it(
  {
    example_input: `[2, 7, 11, 15]\n13`,
    expect_output: `[0,2]`
  },
  () => {
    const result = twoSum([2, 7, 11, 15], 13);
    if (Array.isArray(result)) {
      const isPass = result[0] === 0 && result[1] === 2;
      return [isPass, `[${String(result)}]`];
    }
    return [false, result];
  }
);

it(
  {
    example_input: `[2, 7, 11, 15]\n18`,
    expect_output: `[1,2]`
  },
  () => {
    const result = twoSum([2, 7, 11, 15], 18);
    if (Array.isArray(result)) {
      const isPass = result[0] === 1 && result[1] === 2;
      return [isPass, `[${String(result)}]`];
    }
    return [false, result];
  }
);
