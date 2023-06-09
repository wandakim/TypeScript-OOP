{
  /*
  어디에서 에러 핸들링을 하는 것이 좋을까. 의미있게, 우아하게 에러를 핸들링 하자. 
  */
  class TimeoutError extends Error {}
  class OfflineError extends Error {}

  class NetworkClient {
    tryConnect(): void {
      throw new OfflineError('no network!');
    }
  }

  class UserService {
    constructor(private client: NetworkClient) {} //dependency injection
    login() {
      this.client.tryConnect(); // 처음으로 사용하는 곳은 이곳이다. 여기서 핸들링?
    } // -> 에러가 발생했을 때 내가 정확하게 처리할 수 있는 것이 아니라면 캐치하지 않는 것이 낫다!
  }

  class App {
    constructor(private userService: UserService) {}
    run() {
      try {
        this.userService.login();
      } catch (error) {
        // 캐치로 받는 순간 error는 any Type이 된다.
        // show dialog to use
        // 이렇게 Application level에서, 처리할 수 있는 곳에서 캐치해 주는 것이 좋다. 조금 더 의미있는 에러 처리를 할 수 있다.
        console.log('catched!');
      }
    }
  }

  const client = new NetworkClient();
  const service = new UserService(client);
  const app = new App(service);
  app.run(); // 호출 순서와 함께 에러 발생
}
