export default defineEventHandler(() => {
   const getRandomInt = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
   };

   const getRandomNameRacket = (array: string[]) => {
      return array[Math.floor(Math.random() * array.length)];
   };

   const nameMock = ["A", "B", "C", "D", "E", "F", "G", "H", "i", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
   const count = Math.floor(getRandomInt(2, 6));
   const branches = [];
   const datasets = [];

   for (let i = 0; i < count; i++) {
      branches.push(`Branch ${nameMock[i]}`);

      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const countData = Math.floor(getRandomInt(1, 15));

      const data = [];
      for (let i2 = 0; i2 < countData; i2++) {
         const randomDay = Math.floor(getRandomInt(1, 30)).toString().padStart(2, "0");
         const randomHour = Math.floor(getRandomInt(0, 24)).toString().padStart(2, "0");
         const randomMinute = Math.floor(getRandomInt(0, 59)).toString().padStart(2, "0");
         const level = Math.floor(getRandomInt(1, 4));
         const positionMin = parseInt(`${i + 1}`);
         const positionMax = parseFloat(`${(i == 0 ? 1 : i + 1) + 0.9}`);
         data.push({
            x: new Date(`2024-06-${randomDay}T${randomHour}:${randomMinute}:00`),
            y: getRandomInt(positionMin, positionMax),
            r: level === 1 ? 5 : level === 2 ? 10 : 15,
            name: getRandomNameRacket(nameMock),
            stock: level === 1 ? Math.floor(getRandomInt(100, 199)) : level === 2 ? Math.floor(getRandomInt(200, 299)) : Math.floor(getRandomInt(300, 500)),
            level,
         });
      }
      datasets.push({
         backgroundColor: `#${randomColor}`,
         borderColor: "#e9e9e9",
         data,
      });
   }

   return {
      branches,
      datasets,
   };
});
