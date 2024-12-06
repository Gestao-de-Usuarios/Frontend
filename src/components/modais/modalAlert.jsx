import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import '../../i18nextConfig';
import { useTranslation } from 'react-i18next';

const ModalAlert = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  modalType,
  confirmText,
  children,
}) => {
  const { t } = useTranslation();

  const modalTypes = {
    APAGAR: {
      title: t('modal.apagar.title', 'Exclusão'),
      defaultConfirmText: t('modal.apagar.defaultConfirmText', 'Confirmar'),
      cancelText: t('modal.apagar.cancelText', 'Cancelar'),
    },
    ALERTA: {
      title: t('modal.alerta.title', 'Atenção'),
      defaultConfirmText: t('modal.alerta.defaultConfirmText', 'Confirmar'),
      cancelText: null,
    },
    SUCESSO: {
      title: t('modal.sucesso.title', 'Sucesso'),
      defaultConfirmText: t('modal.sucesso.defaultConfirmText', 'Confirmar'),
      cancelText: null,
    },
    CONFIRMACAO: {
      title: t('modal.confirmacao.title', 'Atenção'),
      defaultConfirmText: t('modal.confirmacao.defaultConfirmText', 'Confirmar'),
      cancelText: t('modal.confirmacao.cancelText', 'Cancelar'),
    },
    // Caso queira um tipo ERRO padrão
    ERRO: {
      title: t('modal.erro.title', 'Erro'),
      defaultConfirmText: t('modal.erro.defaultConfirmText', 'Confirmar'),
      cancelText: t('modal.erro.cancelText', 'Cancelar'),
    },
  };

  // Fecha o modal ao pressionar a tecla "Esc"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  if (!isOpen) return null;

  // Obtém o tipo de modal (ou ERRO se não encontrado)
  const { title, defaultConfirmText, cancelText } = modalTypes[modalType] || modalTypes.ERRO;

  const finalConfirmText = confirmText || defaultConfirmText;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[440px] h-auto max-w-full">
        <div className="flex justify-between items-center border-b border-custom-azul-escuro pb-3 mb-4">
          <h5 className="text-lg font-semibold text-gray-800">{title}</h5>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-bold">{t(message)}</p>
          {children}
        </div>
        <div className="flex justify-end space-x-2">
          {cancelText && (
            <button
              className="text-white font-semibold py-2 px-4 rounded-lg bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}
          <button
            className={`text-white bg-cyan-500 font-semibold py-2 px-4 rounded-lg ${
              modalType === 'ALERTA' || modalType === 'CONFIRMAR' || modalType === 'SUCESSO'
                ? 'bg-custom-azul-escuro hover:bg-custom-azul focus:ring-custom-azul-escuro'
                : 'bg-custom-vermelho hover:bg-custom-vermelho-escuro focus:ring-custom-vermelho'
            }`}
            onClick={handleConfirm}
          >
            {finalConfirmText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

ModalAlert.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  message: PropTypes.string,
  modalType: PropTypes.oneOf(['APAGAR', 'ALERTA', 'SUCESSO', 'CONFIRMACAO']),
  confirmText: PropTypes.string,
  children: PropTypes.node,
};

export default ModalAlert;
