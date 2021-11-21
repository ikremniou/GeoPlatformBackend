export enum messages {
    Auth_InvalidNameOrPassword = "Войти не удалось. Неправильно указано имя пользователя или пароль",
    Invite_CannotAddMoreThenOneForWorker = "Не удалось создать приглашение. Сотрудник уже был приглашён",
    Invite_CannotAddForWorkerWithAccount = "Не удалось создать приглашение. Сотрудник уже зарегистрирован",
    Invite_WorkerIdRequired = "Не удалось создать приглашение. Отсутствует идентификатор рабочего",
    ClassProperty_username = 'Логин',
    ClassProperty_email = 'Почта',
    ClassProperty_password = 'Пароль',
    ClassProperty_registerToken = 'Приглашение',
    Validation_IsEmptyField = 'Поле "{0}" является обязательным',
    Validation_NotUUID = 'Поле "{0}" должно иметь формат UUIDv{1}',
    Validation_Length = 'Длина поля "{0}" должна быть от {1} до {2} символов',
    Validation_NotAscii = 'Поле "{0}" должно иметь только ASCII символы',
    Validation_IsEmail = 'Поле "{0}" должно иметь формат электронной почты',
    Users_InvalidInvitation = 'Не удалось найти приглашение с таким идентификатором',

} 