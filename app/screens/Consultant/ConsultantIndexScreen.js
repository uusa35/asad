import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import SubContractorPanelElement from '../../components/Project/SubContractorPanelElement';
import NotAvailableElement from '../../components/NotAvailableElement';

export default class ConsultantIndexScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const {project, moduleName} = navigation.state.params;
    return (
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30, backgroundColor: 'white'}}
        endFillColor="white"
        showsVerticalScrollIndicator={false}>
        <View style={styles.wrapper}>
          {validate.isEmpty(project.consultants) ? (
            <NotAvailableElement routeName={moduleName} />
          ) : (
            <View>
              {project.consultants.map(d => {
                return (
                  <SubContractorPanelElement
                    key={d.id}
                    element={d}
                    navigation={navigation}
                    routeName="ConsultantShow"
                  />
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

ConsultantIndexScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
