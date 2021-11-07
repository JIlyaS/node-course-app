const validation = (fields, files) => {

  if (!fields.oldPassword) {
    return { status: 'Не указан старый пароль!', err: true };
  }

  if (!fields.newPassword) {
    return { status: 'Не указан новый пароль!', err: true };
  }

  if (fields.oldPassword !== fields.newPassword) {
    return { status: 'Пароли не совпадают!', err: true };
  }

  return { status: 'ok', err: false };
}

module.exports = {
    validation
}