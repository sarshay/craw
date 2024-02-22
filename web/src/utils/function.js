import dayjs from "dayjs";
import { useEffect, useState } from "react";

export function remove(array, remove) {
  const index = array.indexOf(remove);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}
export function nFormat(num) {
  return isNaN(num)
    ? num
    : num.toLocaleString(undefined, { minimumFractionDigits: 0 });
}
export function mySort(data, key, how = "desc") {
  var sortData = data;
  if (how === "asc") {
    const sortingFunction = (a, b) => (a[key] > b[key] ? 1 : -1);
    sortData.sort(sortingFunction);
    return sortData;
  } else {
    const sortingFunction = (a, b) => (a[key] < b[key] ? 1 : -1);
    sortData.sort(sortingFunction);
    return sortData;
  }
}

function sortNumberCompare(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
}
export function sortThis(a, b, prop) {
  //(a, b) => a.regId.localeCompare(b.regId),
  a = a[prop] ? a[prop] : "";
  b = b[prop] ? b[prop] : "";

  if (a instanceof dayjs && b instanceof dayjs) {
    const _aTime = a.toDate().getTime();
    const _bTime = b.toDate().getTime();
    return sortNumberCompare(_aTime, _bTime);
  }

  if (a instanceof dayjs) {
    return 1;
  }

  if (b instanceof dayjs) {
    return -1;
  }
  if (typeof a == "string") {
    return a.localeCompare(b);
  }
  if (!isNaN(a)) {
    return sortNumberCompare(a, b);
  }
}

export function makeFresh({ old, fresh }) {
  const index = (old || []).findIndex((x) => x.id === fresh.id);
  // console.log({ old, fresh, index });
  if (index !== -1) {
    const newData = [...old];
    newData[index] = fresh;
    return newData;
  } else {
    return [fresh, ...old];
  }
}
export function useScrollDirection() {
  let oldScrollY = 0;

  const [direction, setDirection] = useState("up");

  const controlDirection = () => {
    if (window.scrollY > oldScrollY) {
      setDirection("down");
    } else {
      setDirection("up");
    }
    oldScrollY = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", controlDirection);
    return () => {
      window.removeEventListener("scroll", controlDirection);
    };
  }, []);
  return { direction };
}
