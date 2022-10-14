import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endAddGoalHandler = () => {
    setModalIsVisible(false);
  };

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText === '') return;

    // this is a best practice of updating state
    // when state depends on previous state
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Goal'
          color='#ab72f5'
          onPress={startAddGoalHandler}
        />
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          {/* 
          ScrollView is great for articles that might be long,
          but FlatList is better for list items because ScrollView
          renders all the items on the list even if they are not on the screen 
          which can hurt performance. 

          Flat list will only render the itesm currently on the screen.  All the items
          off screen will be rendered 'lazily' as the user scrolls.
        */}
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            // KeyExtractor is useful if you have outside data that does not
            // have a key but does have an id.  Use KeyExtractor to use the
            // id as the key for FlatList
            //
            KeyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceHorizontal={false}
          />
          {/* With FlatList, we no longer map our data manualy */}
          {/* {courseGoals.map((goal) => ( */}
          {/* <View style={styles.goalItem} key={goal}>
            <Text style={styles.goalText}>{goal}</Text>
          </View> */}
          {/* ))} */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: 20,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
    marginTop: 20,
  },
});
