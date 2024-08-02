export const formatCurrency = (value: any, digits: any) => {
   if (!value) {
      return "";
   }
   let dollarUSLocale = Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
   return dollarUSLocale.format(value);
};

export const inputNumberOnly = (e: any) => {
   if (e.keyCode >= 48 && e.keyCode <= 57) {
      e.returnValue = true;
   } else {
      e.returnValue = false;
   }
};

export const getRandomInt = (min: number, max: number) => {
   return Math.random() * (max - min) + min;
};
