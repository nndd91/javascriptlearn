var burger: string = 'hamburger',
    calories: number = 300,
    tasty: boolean = true;

function speak(food: string, energy: number): void {
  console.log("Our " + food + " has " + energy + "calories.");
}

speak(burger, calories);