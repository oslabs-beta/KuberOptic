// enzyme react testing

// npm install enzyme, enzyme adapter
function minus(a, b) {
  return a - b;
}

test('subtract 2 -1 to equal 3', () => {
  expect(minus(2, 1)).toBe(1);
});
