import { Component } from 'react';
import "./styles.css";

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index
        };
    }

    imageChange = (index) => {
        this.setState({
            index: index
        });
    }

    render() {
        return (
            <div className="background">
                <div className="modal"></div>
            </div>
        );
    }
}

export default Modal;