export const homeChallenges = [
  {
    prompt: "Complete the code below to unlock Adompo's profile:",
    code: `int x = 5;
int y = ____;
System.out.println(x + y); // must print 12`,
    answer: '7'
  },
  {
    prompt: "Complete the code below to unlock Adompo's profile:",
    code: `int[] arr = {5, 2, 4, 1, 3};
for (int i = 0; i < arr.length - 1; i++) {
  for (int j = 0; j < arr.length - i - 1; j++) {
    if (arr[j] ____ arr[j + 1]) {
      int temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}`,
    answer: '>'
  },
  {
    prompt: "Complete the code below to unlock Adompo's profile:",
    code: `char[] huruf = "OADMPO".toCharArray();
Arrays.sort(huruf, ____, ____);
System.out.println(new String(huruf)); // must print "ADOMPO"`,
    answer: '0,3'
  }
]

export const challenges = {
  works: {
    prompt: 'Complete the Java code below to unlock the Works menu:',
    code: `String menu = "Wo" + ____ + "ks";
System.out.println(menu); // must print "Works"`,
    answer: 'r'
  },
  linkedin: {
    prompt: 'Complete the Java code below to unlock the Connect menu:',
    code: `boolean isOpen = (5 > 3) ____ (2 < 4);
System.out.println(isOpen); // must print true`,
    answer: '&&'
  },
  resume: {
    prompt: 'Complete the Java code below to unlock Career Snapshot:',
    code: `int year = 2020;
year = year ____ 2;
System.out.println(year); // must print 2022`,
    answer: '+'
  },
  repo: {
    prompt: 'Complete the Java code below to unlock Codebase:',
    code: `String repo = "git".toUpperCase();
System.out.println(repo.equals(____)); // must print true`,
    answer: 'GIT'
  }
}
