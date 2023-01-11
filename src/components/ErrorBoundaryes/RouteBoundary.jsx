import React from 'react';

class RouteBoundary extends React.Component { // Обработка ошибок, связанных с маршрутизацией по страницам
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) { // Отлов ошибки
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
    }

    render() {
        if(this.state.errorInfo) { // Сообщение об ошибке
            return (
                <div>
                    <h2>Error!</h2>
                    <details style={{whiteSpace: "pre-wrap"}}>
                        {this.state.error && this.state.error.toString()}
                        <br/>
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children; // Дефолтный вывод в том случае, если ошибки нет
    }
}

export default RouteBoundary;