import { connect } from 'react-redux';
import ServiceItemDialog from '../components/ServiceItemDialog';
import { sendServiceState } from '../actions';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        toggleServiceState: serviceId => {
            dispatch(sendServiceState(serviceId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceItemDialog);
