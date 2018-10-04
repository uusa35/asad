import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import ProjectPanelWidget from '../../components/Project/ProjectPanelWidget';
import {bindActionCreators} from 'redux';
import {getProject} from '../../redux/actions';
import {connect} from 'react-redux';

class SearchIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {search, actions} = this.props;
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View>
          {search.map(project => (
            <ProjectPanelWidget
              project={project}
              key={project.id}
              handleClick={() => actions.getProject(project.id)}
            />
          ))}
        </View>
      </ScrollView>
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
