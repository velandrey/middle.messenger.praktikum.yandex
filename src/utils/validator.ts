type ValidationResult = {
    isValid: boolean;
    errorMessage?: string;
};

type FieldValidationRule = {
    pattern: RegExp;
    errorMessage: string;
};

type ValidationRules = {
    [key: string]: FieldValidationRule;
};

export class FormValidator {
    private readonly validationRules: ValidationRules= {
        name: {
            pattern: /^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ0-9!@#$%^&*()_+=\[\]{};:'",.<>/?\\|`~]*$/,
            errorMessage: 'Латиница | Кириллица, первая буква заглавная, допустимы цифры и спецсимволы. Запрещён пробел и дефис.'
        },
        login: {
            pattern: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
            errorMessage: 'От 3 до 20 символов. Только латинские буквы. Допустимо использование цифр. Без пробелов, допустимы дефис и подчёркивание',
        },
        email: {
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            errorMessage: 'Некорректный email. Должен содержать @ и точку после неё, перед точкой должны быть буквы',
        },
        password: {
            pattern: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,40}$/,
            errorMessage: 'От 8 до 40 символов, должна быть хотя бы одна заглавная буква и цифра',
        },
        phone: {
            pattern: /^\+?\d{10,15}$/,
            errorMessage: 'От 10 до 15 цифр, может начинаться с +'
        },
        message: {
            pattern: /^.+$/,
            errorMessage: 'Сообщение не должно быть пустым'
        }
    };

    constructor() {

    }

    public validateForm(fields: Record<string, string>): {
        isValid: boolean;
        errors: { [key: string]: string };
    } {
        const errors: { [key: string]: string } = {};
        let isValid:boolean = true;
        Object.entries(fields).forEach(([fieldName, value]:[string,string]) => {
            const validationResult: ValidationResult = this.validateField(fieldName, value);
            if (!validationResult.isValid) {
                isValid = false;
                errors[fieldName] = validationResult.errorMessage || 'Ошибка валидации';
            }
        });

        return {
            isValid,
            errors
        };
    }

    public validateField(fieldName: string, value: string): ValidationResult {
        if (fieldName === 'oldPassword' || fieldName === 'newPassword'){
            fieldName = 'password';
        }
        if (fieldName === 'first_name' || fieldName === 'second_name' || fieldName === 'nic_name'){
            fieldName = 'name';
        }
        const rule:FieldValidationRule = this.validationRules[fieldName];
        if (!rule) {
            return {
                isValid: true,
                errorMessage: `Правило валидации для поля ${fieldName} не найдено`
            };
        }
        const patternMatch:boolean = rule.pattern.test(value);
        if (!patternMatch) {
            return {
                isValid: false,
                errorMessage: rule.errorMessage
            };
        }

        return {
            isValid: true
        };
    }
}
