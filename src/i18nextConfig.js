import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageDetectorOptions } from './lang-detector';
import { languageDetector } from './lang-detector';

const resources = {
    pt: {
        translation: {
            'Inglês': 'Inglês',
            'Português': 'Português',
            'Russo': 'Russo',
            'Cadastrar': 'Cadastrar',
            'Entrar': 'Entrar',
            'Nome Completo': 'Nome Completo',
            'Email': 'Email',
            'Senha': 'Senha',
            'Esqueceu a senha?': 'Esqueceu a senha?',
            'Ou': 'Ou',
            'Continuar com o Google': 'Continuar com o Google',
            'Continuar com o GitHub': 'Continuar com o GitHub',
            'Sua conta foi criada com sucesso!': 'Sua conta foi criada com sucesso!',
            'Usuários Cadastrados': 'Usuários Cadastrados',
            'Gerenciamento dos usuários do sistema.': 'Gerenciamento dos usuários do sistema.',
            'ID': 'ID',
            'Nome': 'Nome',
            'Status': 'Status',
            'Data de Criação': 'Data de Criação',
            'Ação': 'Ação',
            'Bloqueado': 'Bloqueado',
            'Você tem certeza que deseja excluir este usuário?': 'Você tem certeza que deseja excluir este usuário?',
            'Usuário excluído com sucesso!': 'Usuário excluído com sucesso!',
            'Você realmente deseja sair e voltar para a tela de login?': 'Você realmente deseja sair e voltar para a tela de login?',
            'Esqueceu a Senha?': 'Esqueceu a Senha?',
            'Insira seu email para receber uma nova senha.': 'Insira seu email para receber uma nova senha.',
            'Enviar Nova Senha': 'Enviar Nova Senha',
            'Produtos Disponíveis': 'Produtos Disponíveis',
            'Gerência': 'Gerência',
            'Preço': 'Preço',
            'Categoria': 'Categoria',
            'Estoque': 'Estoque',
            'Home': 'Home',
            'Sair': 'Sair',
            'Produtos': 'Produtos',
            'Aqui você pode visualizar a lista de produtos.': 'Aqui você pode visualizar a lista de produtos.',
            'Exclusão': 'Exclusão',
            'Confirmar': 'Confirmar',
            'Cancelar': 'Cancelar',
            'Atenção':  'Atenção',
            'Sucesso': 'Sucesso',
            'Erro': 'Erro',
        },
    },
    en: {
        translation: {
            'Inglês': 'English',
            'Português': 'Portuguese',
            'Russo': 'Russian',
            'Cadastrar': 'Sign up',
            'Entrar': 'Login',
            'Nome Completo': 'Full Name',
            'Email': 'Email',
            'Senha': 'Password',
            'Esqueceu a senha?': 'Forgot your password?',
            'Ou': 'Or',
            'Continuar com o Google': 'Continue with Google',
            'Continuar com o GitHub': 'Continue with Github',
            'Sua conta foi criada com sucesso!': 'Your account has been successfully created!',
            'Usuários Cadastrados': 'Registered Users',
            'Gerenciamento dos usuários do sistema.': 'Management of system users.',
            'ID': 'ID',
            'Nome': 'Name',
            'Status': 'Status',
            'Data de Criação': 'Creation Date',
            'Ação': 'Action',
            'Bloqueado': 'Blocked',
            'Você tem certeza que deseja excluir este usuário?': 'Are you sure you want to delete this user?',
            'Usuário excluído com sucesso!': 'User successfully deleted!',
            'Você realmente deseja sair e voltar para a tela de login?': 'Do you really want to log out and return to the login screen?',
            'Esqueceu a Senha?': 'Forgot your password?',
            'Insira seu email para receber uma nova senha.': 'Enter your email to receive a new password.',
            'Enviar Nova Senha': 'Send New Password',
            'Produtos Disponíveis': 'Available Products',
            'Gerência': 'Management',
            'Preço': 'Price',
            'Categoria': 'Category',
            'Estoque': 'Stock',
            'Home': 'Home',
            'Sair': 'Logout',
            'Produtos': 'Products',
            'Aqui você pode visualizar a lista de produtos.': 'Here you can view the list of products.',
            'Exclusão': 'Deletion',
            'Confirmar': 'Confirm',
            'Cancelar': 'Cancel',
            'Atenção': 'Attention',
            'Sucesso': 'Success',
            'Erro': 'Error',
        },
    },
    ru: {
        translation: {
            'Inglês': 'Английский',
            'Português': 'Португальский',
            'Russo': 'Русский',
            'Cadastrar': 'Регистрация',
            'Entrar': 'Войти',
            'Nome Completo': 'Полное имя',
            'Email': 'Эл. адрес',
            'Senha': 'Пароль',
            'Esqueceu a senha?': 'Забыли пароль?',
            'Ou': 'Или',
            'Continuar com o Google': 'Продолжить c Google',
            'Continuar com o GitHub': 'Продолжить c Github',
            'Sua conta foi criada com sucesso!': 'Ваша учетная запись успешно создана!',
            'Usuários Cadastrados': 'Зарегистрированные пользователи',
            'Gerenciamento dos usuários do sistema.': 'Управление пользователями системы.',
            'ID': 'ID',
            'Nome': 'Имя',
            'Status': 'Статус',
            'Data de Criação': 'Дата создания',
            'Ação': 'Действие',
            'Bloqueado': 'Заблокирован',
            'Você tem certeza que deseja excluir este usuário?': 'Вы уверены, что хотите удалить этого пользователя?',
            'Usuário excluído com sucesso!': 'Пользователь успешно удален!',
            'Você realmente deseja sair e voltar para a tela de login?': 'Вы действительно хотите выйти и вернуться на экран входа?',
            'Esqueceu a Senha?': 'Забыли пароль?',
            'Insira seu email para receber uma nova senha.': 'Введите свой электронный адрес для получения нового пароля.',
            'Enviar Nova Senha': 'Отправить новый пароль',
            'Produtos Disponíveis': 'Доступные товары',
            'Gerência': 'Управление',
            'Preço': 'Цена',
            'Categoria': 'Категория',
            'Estoque': 'Количество',
            'Home': 'Главная',
            'Sair': 'Выход',
            'Produtos': 'Товары',
            'Aqui você pode visualizar a lista de produtos.': 'Здесь вы можете просмотреть список товаров.',
            'Exclusão': 'Удаление',
            'Confirmar': 'Подтвердить',
            'Cancelar': 'Отменить',
            'Atenção': 'Внимание',
            'Sucesso': 'Успех',
            'Erro': 'Ошибка',
        },
    },
};

i18n.use(languageDetector)
    .use(initReactI18next)
    .init({
        detection: LanguageDetectorOptions,
        resources,
        fallbackLng: ['pt', 'en', 'ru'],

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
