export function checkUsername(rules, value, callback) {
  if (!value) {
    return callback(new Error("学号不能为空"));
  } else if (!Number.isInteger(value)) {
    return callback(new Error("学号必须为10位数字"));
  } else if (/^\d{10}$/.test(value) == false) {
    return callback(new Error("学号必须为10位数字"));
  } else callback();
}

export function checkPwd(rules, value, callback) {
  if (!value) {
    return callback(new Error("密码不能为空"));
  } else if (
    /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{8,16}$/.test(value) == false
  ) {
    return callback(new Error("密码必须为8-16位的字母+数字的组合"));
  } else callback();
}