[[121, true], [-121, false], [10, false], [-101, false], [0, true]].forEach(
  tuple => {
    const [num, bool] = tuple;
    it(
      {
        example_input: `${num}`,
        expect_output: `${bool}`
      },
      () => {
        const result = Boolean(isPalindrome(num));
        const isPass = Boolean(result) === bool;
        return [isPass, result];
      }
    );
  }
);
