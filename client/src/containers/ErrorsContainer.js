import { connect } from 'react-redux';
import Errors from '../components/Errors';

const mapStateToProps = state => {
    return {
        errors: state.data.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Errors);
