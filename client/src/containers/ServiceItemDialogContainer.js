import { connect } from 'react-redux';
import ServiceItemDialog from '../components/ServiceItemDialog';
import { pushToggleService } from '../actions';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        pushToggleService: serviceId => {
            dispatch(pushToggleService(serviceId));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ServiceItemDialog);
