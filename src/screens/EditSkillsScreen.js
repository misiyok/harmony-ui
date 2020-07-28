import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, ScaledSheet } from 'react-native-size-matters';
import { Context as ProfileContext } from '../context/ProfileContext';
import SkillsForm from '../components/SkillsForm';
import Header from '../components/Header';
import ContinueButton from '../components/ContinueButton';
import { moderateScale, scale } from 'react-native-size-matters';
const EditSkillsScreen = ({
  onSubmit,
  previousSkills = [],
  cancelSubmit,
  title = 'My skills are',
}) => {
  const { state, _setSkills } = useContext(ProfileContext);
  const [skillsArray, setskillsArray] = useState(null);
  const [selectedSkills, setselectedSkills] = useState([...previousSkills]);
  useEffect(() => {
    arrangeSkillTable();
  }, []);
  const arrangeSkillTable = async () => {
    let categories = [
      {
        name: 'Art & Entertainment',
        skills: [],
      },
      {
        name: 'Industry',
        skills: [],
      },
      {
        name: 'Innovation & Tech',
        skills: [],
      },
      {
        name: 'Software Programming',
        skills: [],
      },
      {
        name: 'Life',
        skills: [],
      },
      {
        name: 'Society',
        skills: [],
      },
      {
        name: 'Music',
        skills: [],
      },
      {
        name: 'Sports',
        skills: [],
      },
      {
        name: 'Others',
        skills: [],
      },
    ];

    const data = state.allSkills;
    console.log('skills data', data);
    data.map((skill) => {
      let categoryIndex = categories.findIndex(
        (x) => x.name === skill.category
      );
      if (categoryIndex === -1) {
        categoryIndex = categories.findIndex((x) => x.name === 'Others');
      }
      console.log('categoryIndex', categoryIndex);
      if (categories[categoryIndex].skills.length < 1) {
        categories[categoryIndex].skills.push([skill]);
      } else {
        if (
          categories[categoryIndex].skills[
            categories[categoryIndex].skills.length - 1
          ].length > 3
        ) {
          categories[categoryIndex].skills.push([skill]);
        } else {
          categories[categoryIndex].skills[
            categories[categoryIndex].skills.length - 1
          ].push(skill);
        }
      }
      //  category.skills.push(skill);
    });
    console.log(categories);
    setskillsArray(categories);
  };

  const changeSelectedSkills = (skill) => {
    let newSkills = [...selectedSkills];
    let skillFoundIndex = selectedSkills.findIndex((x) => x.id === skill.id);
    if (skillFoundIndex !== -1) {
      newSkills.splice(skillFoundIndex, 1);
    } else {
      newSkills.push(skill);
    }
    setselectedSkills(newSkills);
    console.log('new Skills', newSkills);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} onPress={() => cancelSubmit()} />
      {/* <View style={styles.titleView}>
        <Text style={styles.title}>My skills are</Text>
      </View> */}
      {/* <View style={styles.divider} /> */}
      <ScrollView style={styles.mainContent} removeClippedSubviews>
        {skillsArray &&
          skillsArray.map((category, index) => {
            // console.log('category =', category);
            if (!category.skills || category.skills.length < 1) return <></>;
            return (
              <View
                key={index.toString()}
                style={{ width: '100%', alignItems: 'center' }}
              >
                <View
                  style={{
                    width: '100%',
                    paddingTop: 20,
                    paddingHorizontal: 28,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'SFProDisplay300',
                      fontSize: 26,
                      fontStyle: 'normal',

                      letterSpacing: 0.31,
                      textAlign: 'left',
                      color: '#000',
                    }}
                  >
                    {category.name}
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 20,
                  }}
                >
                  {category.skills.map((skillRow, index) => {
                    // console.log('skillroow', skillRow);
                    return (
                      <View
                        key={index.toString()}
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginVertical: 10,
                        }}
                      >
                        {skillRow.map((item, index) => {
                          return (
                            <TouchableOpacity
                              style={{
                                height: scale(60),
                                width: scale(60),
                                marginHorizontal: 5,
                              }}
                              key={index.toString()}
                              onPress={() => {
                                changeSelectedSkills(item);
                              }}
                            >
                              <View
                                style={{
                                  borderRadius: 10,
                                  backgroundColor: '#000',
                                  opacity: selectedSkills.find(
                                    (x) => x.id === item.id
                                  )
                                    ? 1
                                    : 0.1,
                                }}
                              >
                                {item.uri && (
                                  <Image
                                    source={{ uri: item.uri }}
                                    style={{
                                      height: scale(60),
                                      width: scale(60),
                                      borderRadius: 10,
                                      resizeMode: 'cover',
                                    }}
                                  />
                                )}
                              </View>
                              <View
                                style={{
                                  width: '100%',
                                  alignItems: 'center',
                                  marginTop: 5,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: 'SFProDisplay300',
                                    fontSize: 13,
                                    fontStyle: 'normal',

                                    letterSpacing: 0,
                                    textAlign: 'left',
                                    color: '#000',
                                  }}
                                  adjustsFontSizeToFit
                                  numberOfLines={1}
                                >
                                  {item.name}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    height: 1,
                    borderBottomWidth: 1,
                    borderColor: '#f0f0f0',
                    width: '90%',
                  }}
                ></View>
              </View>
            );
          })}

        {/* <SkillsForm
          headerText="My skills are"
          submitButtonText="CONTINUE"
          onSubmit={(skills) => {
            _setSkills(skills);
            navigation.navigate('WishesInput');
          }}
          allSkills={state.allSkills}
        /> */}
        {/* <Text style={styles.categoryTitle}>Category</Text>
        <Flatlist d /> */}
      </ScrollView>
      <ContinueButton
        title="SUBMIT"
        onPress={() => {
          // _setSkills(selectedSkills);
          onSubmit(selectedSkills);
          // navigation.navigate('WishesInput');
        }}
      />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    // marginTop: 100,
    backgroundColor: '#fff',
    flex: 1,
  },
  titleView: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: 'SFProDisplay700',
    fontSize: 26,
    fontStyle: 'normal',
    lineHeight: 41,
    letterSpacing: 0.31,
    textAlign: 'left',
    color: '#ffffff',
  },
  divider: {
    width: '100%',
    height: 1,
    opacity: 0.2,
    backgroundColor: '#fff',
    shadowColor: 'rgba(255, 255, 255, 0.16)',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
  },
  mainContent: {
    width: '100%',
    height: '100%',
    // paddingHorizontal: 28,
    paddingVertical: 28,
  },
  categoryTitle: {
    fontFamily: 'SFProDisplay300',
    fontSize: 26,
    fontStyle: 'normal',
    lineHeight: 41,
    letterSpacing: 0.31,
    textAlign: 'left',
    color: '#000',
  },
});

export default EditSkillsScreen;
