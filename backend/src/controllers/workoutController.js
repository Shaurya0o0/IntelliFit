import { spawn } from "child_process";

export const getWorkoutRecommendation = async (
  req,
  res
) => {
  try {
    const {
      age,
      gender,
      height,
      weight,
      fitness_level,
      goal
    } = req.body;

    const bmi = (
      weight /
      ((height / 100) * (height / 100))
    ).toFixed(2);

    // ==========================
    // WORKOUT RECOMMENDATION
    // ==========================

    const workoutProcess = spawn("python", [
      "../machine_learning/recommend.py",
      age.toString(),
      gender,
      bmi.toString(),
      fitness_level,
      goal
    ]);

    let workoutData = "";

    workoutProcess.stdout.on("data", (data) => {
      workoutData += data.toString();
    });

    workoutProcess.stderr.on("data", (data) => {
      console.error(
        "Workout Error:",
        data.toString()
      );
    });

    workoutProcess.on("close", () => {
      try {
        const recommendation =
          JSON.parse(workoutData);

        // ==========================
        // BODY GOAL
        // ==========================

        const bodyGoalProcess =
          spawn("python", [
            "../machine_learning/body_goal.py",
            bmi.toString(),
            fitness_level
          ]);

        let goalData = "";

        bodyGoalProcess.stdout.on(
          "data",
          (data) => {
            goalData += data.toString();
          }
        );

        bodyGoalProcess.stderr.on(
          "data",
          (data) => {
            console.error(
              "Body Goal Error:",
              data.toString()
            );
          }
        );

        bodyGoalProcess.on(
          "close",
          () => {
            try {
              const bodyGoal =
                JSON.parse(goalData);

              // ==========================
              // GOAL EXPLANATION
              // ==========================

              const explanationProcess =
                spawn("python", [
                  "../machine_learning/goal_explanation.py",
                  bmi.toString(),
                  fitness_level,
                  bodyGoal.body_goal
                ]);

              let explanationData = "";

              explanationProcess.stdout.on(
                "data",
                (data) => {
                  explanationData +=
                    data.toString();
                }
              );

              explanationProcess.stderr.on(
                "data",
                (data) => {
                  console.error(
                    "Goal Analysis Error:",
                    data.toString()
                  );
                }
              );

              explanationProcess.on(
                "close",
                () => {
                  try {
                    const goalAnalysis =
                      JSON.parse(
                        explanationData
                      );

                    // ==========================
                    // DIET
                    // ==========================

                    const dietProcess =
                      spawn("python", [
                        "../machine_learning/diet_recommend.py",
                        weight.toString(),
                        bodyGoal.body_goal
                      ]);

                    let dietData = "";

                    dietProcess.stdout.on(
                      "data",
                      (data) => {
                        dietData +=
                          data.toString();
                      }
                    );

                    dietProcess.stderr.on(
                      "data",
                      (data) => {
                        console.error(
                          "Diet Error:",
                          data.toString()
                        );
                      }
                    );

                    dietProcess.on(
                      "close",
                      () => {
                        try {
                          const diet =
                            JSON.parse(
                              dietData
                            );

                          // ==========================
                          // PROGRESS PREDICTION
                          // ==========================

                          const progressProcess =
                            spawn("python", [
                              "../machine_learning/progress_predictor.py",
                              weight.toString(),
                              bodyGoal.body_goal
                            ]);

                          let progressData =
                            "";

                          progressProcess.stdout.on(
                            "data",
                            (data) => {
                              progressData +=
                                data.toString();
                            }
                          );

                          progressProcess.stderr.on(
                            "data",
                            (data) => {
                              console.error(
                                "Progress Error:",
                                data.toString()
                              );
                            }
                          );

                          progressProcess.on(
                            "close",
                            () => {
                              try {
                                const progressPrediction =
                                  JSON.parse(
                                    progressData
                                  );

                                return res
                                  .status(200)
                                  .json({
                                    success: true,

                                    bmi: Number(
                                      bmi
                                    ),

                                    body_goal:
                                      bodyGoal.body_goal,

                                    goal_analysis:
                                      goalAnalysis,

                                    user: {
                                      age,
                                      gender,
                                      height,
                                      weight,
                                      fitness_level,
                                      goal
                                    },

                                    recommendation,

                                    diet,

                                    progress_prediction:
                                      progressPrediction
                                  });
                              } catch (
                                error
                              ) {
                                return res
                                  .status(500)
                                  .json({
                                    success:
                                      false,
                                    message:
                                      "Progress Prediction Parse Error",
                                    error:
                                      error.message
                                  });
                              }
                            }
                          );
                        } catch (
                          error
                        ) {
                          return res
                            .status(500)
                            .json({
                              success:
                                false,
                              message:
                                "Diet Parse Error",
                              error:
                                error.message
                            });
                        }
                      }
                    );
                  } catch (error) {
                    return res
                      .status(500)
                      .json({
                        success: false,
                        message:
                          "Goal Analysis Parse Error",
                        error:
                          error.message
                      });
                  }
                }
              );
            } catch (error) {
              return res.status(500).json({
                success: false,
                message:
                  "Body Goal Parse Error",
                error: error.message
              });
            }
          }
        );
      } catch (error) {
        return res.status(500).json({
          success: false,
          message:
            "Workout Parse Error",
          error: error.message
        });
      }
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};