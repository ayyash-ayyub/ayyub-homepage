export const challenges = {
  home: {
    prompt: 'Lengkapi kode Java berikut untuk membuka bagian ini:',
    code: `int x = 5;
int y = ____;
System.out.println(x + y); // harus mencetak 12`,
    answer: '7'
  },
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
