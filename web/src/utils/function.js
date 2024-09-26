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

export function sortThis(a, b, prop) {
  function sortNumberCompare(a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  }
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

export function sortData(data, sortKey, sortOrder = "asc") {
  const sortNumberCompare = (a, b) => {
    return a - b;
  };

  const compareFunction = (a, b) => {
    let valueA = a[sortKey] ? a[sortKey] : "";
    let valueB = b[sortKey] ? b[sortKey] : "";

    if (valueA instanceof dayjs && valueB instanceof dayjs) {
      const _valueATime = valueA.toDate().getTime();
      const _valueBTime = valueB.toDate().getTime();
      return sortOrder === "asc"
        ? sortNumberCompare(_valueATime, _valueBTime)
        : sortNumberCompare(_valueBTime, _valueATime);
    }

    if (valueA instanceof dayjs) {
      return sortOrder === "asc" ? 1 : -1;
    }

    if (valueB instanceof dayjs) {
      return sortOrder === "asc" ? -1 : 1;
    }

    if (typeof valueA === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (!isNaN(valueA)) {
      return sortOrder === "asc"
        ? sortNumberCompare(valueA, valueB)
        : sortNumberCompare(valueB, valueA);
    }
  };

  return data.sort(compareFunction);
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

export const getIsMobile = () => {
  let isMobile = false;

  try {
    isMobile = !!(
      (window.navigator && window.navigator.standalone) ||
      navigator.userAgent.match("CriOS") ||
      navigator.userAgent.match(/mobile/i)
    );
  } catch (ex) {
    // continue regardless of error
  }

  return isMobile;
};
