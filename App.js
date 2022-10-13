import { useState } from 'react';
import { StyleSheet, View, FlatList, KeyExtractor } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    if (enteredGoalText === '') return;

    // this is a best practice of updating state
    // when state depends on previous state
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
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
          keyExtractor={(item, index) => {
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
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
