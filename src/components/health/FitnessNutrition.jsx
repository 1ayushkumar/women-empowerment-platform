import Card from '../shared/Card';

const workoutPlans = [
  {
    title: 'Beginner Yoga',
    duration: '30 mins',
    frequency: '3x per week',
    level: 'Beginner',
  },
  {
    title: 'Home HIIT',
    duration: '20 mins',
    frequency: '4x per week',
    level: 'Intermediate',
  },
  {
    title: 'Strength Training',
    duration: '45 mins',
    frequency: '3x per week',
    level: 'Advanced',
  },
];

const healthyRecipes = [
  {
    title: 'Quinoa Buddha Bowl',
    prepTime: '20 mins',
    calories: 400,
    type: 'Vegetarian',
  },
  {
    title: 'Greek Salad',
    prepTime: '15 mins',
    calories: 300,
    type: 'Vegan',
  },
  {
    title: 'Grilled Chicken Bowl',
    prepTime: '25 mins',
    calories: 450,
    type: 'High Protein',
  },
];

function FitnessNutrition() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-6">Workout Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workoutPlans.map((plan, index) => (
            <Card key={index}>
              <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
              <div className="space-y-2 text-gray-600">
                <p>Duration: {plan.duration}</p>
                <p>Frequency: {plan.frequency}</p>
                <p>Level: {plan.level}</p>
              </div>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                Start Plan
              </button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Healthy Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthyRecipes.map((recipe, index) => (
            <Card key={index}>
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <div className="space-y-2 text-gray-600">
                <p>Prep Time: {recipe.prepTime}</p>
                <p>Calories: {recipe.calories}</p>
                <p>Type: {recipe.type}</p>
              </div>
              <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                View Recipe
              </button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FitnessNutrition;