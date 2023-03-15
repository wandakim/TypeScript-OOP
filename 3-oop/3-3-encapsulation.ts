{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // public
  // private 외부에서 볼 수도 접근할 수도 없다.
  // protected 상속을 할 때, 외부에서는 볼 수 없지만 자식 클래스에서는 볼 수 있게 함
  class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7; // class level
    private coffeeBeans: number = 0; // instance (object) level

    private constructor(coffeeBeans: number) {
      // private 하므로써 makeMachine을 사용하도록 권장
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      // public 함수들은 따로 public이라고 작성 안해주어도 된다.
      if (beans < 0) {
        throw new Error('value for beans should be greater than 0');
      }
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans!');
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = CoffeeMaker.makeMachine(32);
  maker.fillCoffeeBeans(32);

  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
    private internalAge = 4;
    get age(): number {
      return this.internalAge;
    }
    set age(num: number) {
      if (num < 0) {
        // 전달된 값의 유효성 검사가 가능하다.
      }
      this.internalAge = num;
    }
    constructor(private firstName: string, public lastName: string) {}
    // 생성자에 접근 제어자를 설정해 두면 바로 멤버변수로 설정이 된다.
  }
  const user = new User('Steve', 'Jobs');
  user.age = 6;
  console.log(user.fullName);
}
