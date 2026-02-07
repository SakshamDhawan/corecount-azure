// import type { SubmitHandler } from "react-hook-form";
// import { useEffect } from "react";
// import { View } from "react-native";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
//
// import type { ProgrammeFeedbackType } from "@corecount/dbprisma/schemas";
// import { ProgrammeFeedbackSchema } from "@corecount/dbprisma/schemas";
// import { colors } from "@corecount/tailwind-config/constants";
//
// import {
//   Clock,
//   DifficultyBase,
//   FaceBad,
//   FaceGood,
//   FaceNeutral,
//   FaceVBad,
//   FaceVGood,
//   Star,
// } from "~/assets/icons";
// import StyledText, { typography } from "~/components/styled/StyledText";
// import Button from "~/components/ui/Button";
// import Input from "~/components/ui/Input";
// import PageLayout from "~/components/ui/PageLayout";
// import useAuth from "~/context/useAuth";
// import { api } from "~/context/useTRPC";
// import { StartWorkoutProps } from "~/components/workout/screens/StartExercise";
//
// const WorkoutFeedback = ({ ...props }: StartWorkoutProps) => {
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<ProgrammeFeedbackType>({
//     resolver: zodResolver(ProgrammeFeedbackSchema),
//   });
//
//   const { user } = useAuth();
//   const completedWorkoutMutation = api.completedWorkouts.add.useMutation();
//
//   useEffect(() => {
//     setValue("duration", props.duration);
//     setValue("repetitions", props.repetitions);
//   }, []);
//
//   const onSubmit: SubmitHandler<ProgrammeFeedbackType> = (data) => {
//     const workoutData = {
//       user: { connect: { id: user?.id } },
//       workout: { connect: { id: props.id } },
//       duration: data.duration,
//       repetitions: data.repetitions,
//       comments: data.comments,
//       rating: data.rating,
//       completedProgramme: props.completedProgramme
//         ? { connect: { id: props.completedProgramme.id } }
//         : undefined,
//     };
//
//     completedWorkoutMutation.mutate(workoutData);
//
//     props.onCompleted(workoutData);
//   };
//
//   return (
//     <PageLayout>
//       <StyledText>Good workout!</StyledText>
//       <StyledText>8:12am July 12th ‘23</StyledText>
//
//       <View className={"flex flex-row justify-around"}>
//         <View>
//           <View
//             className={
//               "size-16 items-center justify-center rounded-full bg-dark-60"
//             }
//           >
//             <Clock stroke={"#A16EFF"} />
//           </View>
//           <StyledText className={"text-purple"}>
//             <StyledText className={"text-purple"} style={typography.h1}>
//               6
//             </StyledText>
//             <StyledText
//               className={"text-purple"}
//               style={typography.body.medium}
//             >
//               m
//             </StyledText>
//
//             <StyledText className={"text-purple"} style={typography.h1}>
//               27
//             </StyledText>
//             <StyledText
//               className={"text-purple"}
//               style={typography.body.medium}
//             >
//               s
//             </StyledText>
//           </StyledText>
//           <StyledText>Duration</StyledText>
//         </View>
//         <View>
//           <View
//             className={
//               "size-16 items-center justify-center rounded-full bg-dark-60"
//             }
//           >
//             <Star stroke={colors.purple} />
//           </View>
//           <StyledText className={"text-yellow-400"} style={typography.h1}>
//             GOLD
//           </StyledText>
//           <StyledText>Duration</StyledText>
//         </View>
//         <View>
//           <View
//             className={
//               "size-16 items-center justify-center rounded-full bg-dark-60"
//             }
//           >
//             <DifficultyBase stroke={colors.purple} />
//           </View>
//           <StyledText className={"text-purple"}>
//             <StyledText className={"text-purple"} style={typography.h1}>
//               6
//             </StyledText>
//             <StyledText
//               className={"text-purple"}
//               style={typography.body.medium}
//             >
//               m
//             </StyledText>
//
//             <StyledText className={"text-purple"} style={typography.h1}>
//               27
//             </StyledText>
//             <StyledText
//               className={"text-purple"}
//               style={typography.body.medium}
//             >
//               s
//             </StyledText>
//           </StyledText>
//           <StyledText>Reps</StyledText>
//         </View>
//       </View>
//
//       <View>
//         <StyledText style={typography.h2}>How was your workout?</StyledText>
//
//         <Controller
//           control={control}
//           defaultValue={3}
//           name={"rating"}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <>
//               <View className={"flex flex-row justify-around"}>
//                 <View
//                   className={"h-8 w-8 items-center justify-center rounded-full"}
//                   style={{
//                     backgroundColor:
//                       value === 1 ? colors.green : colors.dark["80"],
//                   }}
//                 >
//                   <FaceVBad
//                     onPress={() => onChange(1)}
//                     stroke={
//                       value === 1 ? colors.dark["90"] : colors.light["80"]
//                     }
//                     width={24}
//                     height={24}
//                   />
//                 </View>
//                 <View
//                   className={"h-8 w-8 items-center justify-center rounded-full"}
//                   style={{
//                     backgroundColor:
//                       value === 2 ? colors.green : colors.dark["80"],
//                   }}
//                 >
//                   <FaceBad
//                     onPress={() => onChange(2)}
//                     stroke={
//                       value === 2 ? colors.dark["90"] : colors.light["80"]
//                     }
//                     width={24}
//                     height={24}
//                   />
//                 </View>
//                 <View
//                   className={"h-8 w-8 items-center justify-center rounded-full"}
//                   style={{
//                     backgroundColor:
//                       value === 3 ? colors.green : colors.dark["80"],
//                   }}
//                 >
//                   <FaceNeutral
//                     onPress={() => onChange(3)}
//                     stroke={
//                       value === 3 ? colors.dark["90"] : colors.light["80"]
//                     }
//                     width={24}
//                     height={24}
//                   />
//                 </View>
//                 <View
//                   className={"h-8 w-8 items-center justify-center rounded-full"}
//                   style={{
//                     backgroundColor:
//                       value === 4 ? colors.green : colors.dark["80"],
//                   }}
//                 >
//                   <FaceGood
//                     onPress={() => onChange(4)}
//                     stroke={
//                       value === 4 ? colors.dark["90"] : colors.light["80"]
//                     }
//                     width={24}
//                     height={24}
//                   />
//                 </View>
//                 <View
//                   className={"h-8 w-8 items-center justify-center rounded-full"}
//                   style={{
//                     backgroundColor:
//                       value === 5 ? colors.green : colors.dark["80"],
//                   }}
//                 >
//                   <FaceVGood
//                     onPress={() => onChange(5)}
//                     stroke={
//                       value === 5 ? colors.dark["90"] : colors.light["80"]
//                     }
//                     width={24}
//                     height={24}
//                   />
//                 </View>
//               </View>
//             </>
//           )}
//         />
//         {errors.rating && (
//           <StyledText className={"text-red"}>
//             {errors.rating.message}
//           </StyledText>
//         )}
//
//         <Controller
//           control={control}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <Input
//               multiline={true}
//               numberOfLines={5}
//               placeholder="Leave a comment about your workout…"
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//           name="comments"
//         />
//       </View>
//       {errors.comments && (
//         <StyledText className={"text-red"}>
//           {errors.comments.message}
//         </StyledText>
//       )}
//
//       <StyledText>{JSON.stringify(errors)}</StyledText>
//
//       <View className={"grow"}></View>
//       <View>
//         <Button onPress={handleSubmit(onSubmit)}>Continue</Button>
//       </View>
//     </PageLayout>
//   );
// };
//
// export default WorkoutFeedback;
