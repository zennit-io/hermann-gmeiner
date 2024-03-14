/// <reference path="./augmentation.d.ts" />

String.prototype.splitCamelCase = function () {
  return this.split(/(?=[A-Z])/);
};
Number.prototype.parseCurrencyValue = function (currency) {
  if (this === 0) return "-";
  return this.toLocaleString("en-UK", {
    style: "currency",
    currency,
  });
};
Date.prototype.format = function (joiner = "/") {
  const day = this.getDate().toString().padStart(2, "0");
  const month = (this.getMonth() + 1).toString().padStart(2, "0");
  const year = this.getFullYear();
  const hour = this.getHours().toString().padStart(2, "0");
  const minutes = this.getMinutes().toString().padStart(2, "0");
  const seconds = this.getSeconds().toString().padStart(2, "0");
  return {
    date: [day, month, year].join(joiner),
    time: [hour, minutes, seconds].join(":"),
  };
};
