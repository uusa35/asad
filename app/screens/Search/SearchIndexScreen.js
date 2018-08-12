import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {bindActionCreators} from 'redux';
import {getProject} from '../../redux/actions';
import {connect} from 'react-redux';
import SearchInput from './../../components/SearchInput';

class SearchIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {search, actions} = this.props;
    return (
      <View>
        {search.map(project => (
          <ProjectPanelWidget
            project={project}
            key={project.id}
            handleClick={() => actions.getProject(project.id)}
          />
        ))}
      </View>
    );
  }
}

SearchIndexScreen.propTypes = {
  projects: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProject: bindActionCreators(getProject, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchIndexScreen);

export const styles = StyleSheet.create({});
