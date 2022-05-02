import { useFormikContext } from "formik";
import { useRef, useEffect } from "react";
var hasElementType = typeof Element !== "undefined";
var hasMap = typeof Map === "function";
var hasSet = typeof Set === "function";
var hasArrayBuffer = typeof ArrayBuffer === "function" && !!ArrayBuffer.isView;
function equal(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor)
      return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b[i]))
          return false;
      return true;
    }
    var it;
    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size)
        return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0]))
          return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0])))
          return false;
      return true;
    }
    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size)
        return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0]))
          return false;
      return true;
    }
    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (a[i] !== b[i])
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    if (hasElementType && a instanceof Element)
      return false;
    for (i = length; i-- !== 0; ) {
      if ((keys[i] === "_owner" || keys[i] === "__v" || keys[i] === "__o") && a.$$typeof) {
        continue;
      }
      if (!equal(a[keys[i]], b[keys[i]]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
}
var reactFastCompare = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || "").match(/stack|recursion/i)) {
      console.warn("react-fast-compare cannot handle circular refs");
      return false;
    }
    throw error;
  }
};
function getSavedContext(cacheKey, sessionStorage) {
  if (sessionStorage) {
    return window.sessionStorage.getItem(cacheKey);
  }
  return window.localStorage.getItem(cacheKey);
}
const Persist = ({
  cacheKey,
  sessionStorage,
  confirmMessage,
  debounceTiming = 300
}) => {
  const context = useFormikContext();
  const setFormikState = context.setFormikState;
  const lastSavedContext = useRef();
  useEffect(() => {
    const savedContext = getSavedContext(cacheKey, sessionStorage);
    if (!savedContext) {
      return;
    }
    const parsedContext = JSON.parse(savedContext);
    if (!parsedContext.dirty) {
      return;
    }
    if (!confirmMessage) {
      setFormikState(parsedContext);
      return;
    }
    if (window.confirm(confirmMessage)) {
      setFormikState(parsedContext);
    } else {
      window.localStorage.removeItem(cacheKey);
    }
  }, [cacheKey, sessionStorage, confirmMessage, setFormikState]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (reactFastCompare(context, lastSavedContext.current)) {
        return;
      }
      if (sessionStorage) {
        window.sessionStorage.setItem(cacheKey, JSON.stringify(context));
      } else {
        window.localStorage.setItem(cacheKey, JSON.stringify(context));
      }
      lastSavedContext.current = context;
    }, debounceTiming);
    return () => {
      clearTimeout(timeout);
    };
  }, [cacheKey, context, debounceTiming, sessionStorage]);
  return null;
};
export { Persist };
