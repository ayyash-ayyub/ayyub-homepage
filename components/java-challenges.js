export const homeChallenges = [
  {
    prompt: 'Lengkapi kode berikut untuk membuka profile adompo jika kau memang kepo:',
    code: `int x = 5;
int y = ____;
System.out.println(x + y); // harus mencetak 12`,
    answer: '7'
  },
  {
    prompt: 'Lengkapi kode berikut untuk membuka profile adompo jika kau memang kepo:',
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
    prompt: 'Lengkapi kode berikut untuk membuka profile adompo jika kau memang kepo:',
    code: `char[] huruf = "OADMPO".toCharArray();
Arrays.sort(huruf, ____, ____);
System.out.println(new String(huruf)); // harus mencetak "ADOMPO"`,
    answer: '0,3'
  }
]

export const challenges = {
  works: {
    prompt: 'Lengkapi kode Java berikut untuk membuka menu Works:',
    code: `String menu = "Wo" + ____ + "ks";
System.out.println(menu); // harus mencetak "Works"`,
    answer: 'r'
  },
  linkedin: {
    prompt: 'Lengkapi kode Java berikut untuk membuka menu LinkedIn:',
    code: `boolean isOpen = (5 > 3) ____ (2 < 4);
System.out.println(isOpen); // harus mencetak true`,
    answer: '&&'
  },
  resume: {
    prompt: 'Lengkapi kode Java berikut untuk membuka 2022 Resume:',
    code: `int year = 2020;
year = year ____ 2;
System.out.println(year); // harus mencetak 2022`,
    answer: '+'
  },
  repo: {
    prompt: 'Lengkapi kode Java berikut untuk membuka My Repo:',
    code: `String repo = "git".toUpperCase();
System.out.println(repo.equals(____)); // harus mencetak true`,
    answer: 'GIT'
  }
}
