import React from "react";

export const Pagination = ({
    totalCount,
    pageSize,
    currentPage,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    // Função para gerar o intervalo da paginação
    const generatePagination = () => {
        const pages = [];

        // Adiciona a página atual e até 1 página antes e depois
        for (
            let i = Math.max(1, currentPage - 1);
            i <= Math.min(totalPages, currentPage + 1);
            i++
        ) {
            pages.push(i);
        }

        return pages;
    };

    const paginationRange = generatePagination();

    const onPrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const onNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const onFirst = () => onPageChange(1);
    const onLast = () => onPageChange(totalPages);

    if (totalPages <= 1) return null;

    return (
        <ul className="pagination-container flex space-x-2 items-center">
            {/* Botão para Primeira Página */}
            <li>
                <button
                    onClick={onFirst}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    &lt; &lt;
                </button>
            </li>
            
            {/* Botão Anterior */}
            <li>
                <button
                    onClick={onPrevious}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    &lt;
                </button>
            </li>

            {/* Páginas */}
            {paginationRange.map((page) => (
                <li key={page}>
                    <button
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                            }`}
                    >
                        {page}
                    </button>
                </li>
            ))}

            {/* Botão Próximo */}
            <li>
                <button
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    &gt;
                </button>
            </li>
            {/* Botão para Última Página */}
            <li>
                <button
                    onClick={onLast}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    &gt; &gt;
                </button>
            </li>
        </ul>
    );
};
