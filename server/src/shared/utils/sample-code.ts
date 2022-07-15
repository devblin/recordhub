export const SAMPLE_CODE = {
  js: `
  // program to generate fibonacci series up to n terms

  // take input from the user
  const number = parseInt(prompt('Enter the number of terms: '));
  let n1 = 0, n2 = 1, nextTerm;

  console.log('Fibonacci Series:');

  for (let i = 1; i <= number; i++) {
      console.log(n1);
      nextTerm = n1 + n2;
      n1 = n2;
      n2 = nextTerm;
  }
  `,

  py: `
  # Program to display the Fibonacci sequence up to n-th term

  nterms = int(input("How many terms? "))

  # first two terms
  n1, n2 = 0, 1
  count = 0

  # check if the number of terms is valid
  if nterms <= 0:
    print("Please enter a positive integer")
  # if there is only one term, return n1
  elif nterms == 1:
    print("Fibonacci sequence upto",nterms,":")
    print(n1)
  # generate fibonacci sequence
  else:
    print("Fibonacci sequence:")
    while count < nterms:
        print(n1)
        nth = n1 + n2
        # update values
        n1 = n2
        n2 = nth
        count += 1
  `,

  cpp: `
  #include <iostream>
  using namespace std;
  
  int main() {
      int n, t1 = 0, t2 = 1, nextTerm = 0;
  
      cout << "Enter the number of terms: ";
      cin >> n;
  
      cout << "Fibonacci Series: ";
  
      for (int i = 1; i <= n; ++i) {
          // Prints the first two terms.
          if(i == 1) {
              cout << t1 << ", ";
              continue;
          }
          if(i == 2) {
              cout << t2 << ", ";
              continue;
          }
          nextTerm = t1 + t2;
          t1 = t2;
          t2 = nextTerm;
          
          cout << nextTerm << ", ";
      }
      return 0;
  }
  `,
};
