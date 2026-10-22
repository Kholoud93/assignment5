/*
Question:
LeetCode 27. Remove Element

Given an integer array nums and an integer val, remove all occurrences of val
in nums in-place. The order of the elements may be changed. Then return the
number of elements in nums which are not equal to val.

The first k elements of nums must contain the elements which are not equal to val.
Return k.
*/

var removeElement = function (nums, val) {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
};
