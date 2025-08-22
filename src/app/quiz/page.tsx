'use client';

import QuizLayout from "@/components/QuizLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CustomTextInput } from "@/components/ui/custom-text-input";
import { CustomDateInput } from "@/components/ui/custom-date-input";
import { CustomTimeInput } from "@/components/ui/custom-time-input";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react";
import CitySearch from "@/components/CitySearch";
import TimezoneSelector from "@/components/TimezoneSelector";
import { getCurrentTimezone } from "@/lib/timezone";
import { quizApi } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

interface BirthInfo {
  dob?: string;
  birthTime?: string;
  birthPlace?: string;
  timezone_offset?: number;
}

interface Preferences {
  budget?: string;
  timeCommitment?: string;
  sessionPreference?: string;
}

interface FinalPreferences {
  eligibleNonprofit?: string;
  nonprofitReason?: string;
  productInterest?: string;
}

interface QuizAnswer {
  value: string | string[] | BirthInfo | Preferences | FinalPreferences;
  logicField: string;
}

interface Question {
  id: string;
  question: string;
  type: string;
  logicField: string;
  options?: string[];
  maxSelect?: number;
}

const Quiz = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  // Initialize with current timezone
  const [currentTimezone, setCurrentTimezone] = useState<number | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timezone = getCurrentTimezone();
      setCurrentTimezone(timezone.offset);
    }
  }, []);
  
  const questions: Question[] = [
    {
      id: "birth_info",
      question: "Let's start with your birth information",
      type: "birthInfo",
      logicField: "birthInfo"
    },
    {
      id: "energy_type",
      question: "Do you know your Human Design Energy Type?",
      type: "singleChoice",
      options: [
        "Generator",
        "Manifestor",
        "Manifesting Generator",
        "Projector",
        "Reflector",
        "I'm not sure"
      ],
      logicField: "energyType"
    },
    {
      id: "energy_type_calc",
      question: "If you don't know your energy type, would you like us to calculate it for you?",
      type: "singleChoice",
      options: ["Yes", "No"],
      logicField: "calculateEnergyType"
    },
    {
      id: "wellness_focus",
      question: "What's your primary wellness focus right now?",
      type: "singleChoice",
      options: [
        "Anxiety & Stress Relief",
        "Trauma Recovery & Healing",
        "Emotional Balance & Mental Health",
        "Physical Health & Energy",
        "Spiritual Growth & Awakening",
        "Overall Life Balance"
      ],
      logicField: "challenge"
    },
    {
      id: "balance_activities",
      question: "What activities help you feel balanced? (Choose up to 2)",
      type: "multiChoice",
      options: [
        "Meditation & mindfulness",
        "Physical exercise",
        "Creative expression (art, music, writing)",
        "Social connection & community",
        "Nature & outdoor activities",
        "Energy work & holistic therapies"
      ],
      maxSelect: 2,
      logicField: "balanceActivities"
    },
    {
      id: "preferences",
      question: "Tell us about your preferences",
      type: "preferences",
      logicField: "preferences"
    },
    {
      id: "practitioner_type",
      question: "What type of practitioner do you feel most drawn to?",
      type: "singleChoice",
      options: [
        "Energy healer (Reiki, Chakra balancing)",
        "Mind-body practitioner (Yoga, Tai Chi)",
        "Talk-based therapist/coach",
        "Bodywork therapist (Massage, Craniosacral)",
        "Spiritual guide (Astrology, Tarot, Meditation)"
      ],
      logicField: "practitionerType"
    },
    {
      id: "final_preferences",
      question: "A few final preferences",
      type: "finalPreferences",
      logicField: "finalPreferences"
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quizProgress');
      const savedIndex = saved ? parseInt(saved) : 0;
      // Ensure the saved index is within valid bounds
      return Math.min(savedIndex, questions.length - 1);
    }
    return 0;
  });
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quizAnswers');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizStartTime] = useState(Date.now()); // Track when quiz started
  
  const getQuestionIcon = (type: string) => {
    switch (type) {
      case "date":
        return <Calendar className="w-5 h-5" />;
      case "time":
        return <Clock className="w-5 h-5" />;
      case "text":
        return <MapPin className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };



  const handleAnswer = useCallback((value: string | string[] | BirthInfo | Preferences | FinalPreferences) => {
    const currentQ = questions[currentQuestion];
    
    const newAnswers = {
      ...answers,
      [currentQ.id]: {
        value,
        logicField: currentQ.logicField
      }
    };
    setAnswers(newAnswers);
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
    }
  }, [answers, currentQuestion, questions]);

  // Set default timezone when birth info is first accessed
  useEffect(() => {
    if (typeof window !== 'undefined' && currentTimezone !== null && currentTimezone !== 0) {
      const birthInfo = answers["birth_info"]?.value as BirthInfo;
      if (birthInfo && birthInfo.timezone_offset === undefined) {
        handleAnswer({ ...birthInfo, timezone_offset: currentTimezone });
      }
    }
  }, [currentTimezone, answers, handleAnswer]);

  const handleMultiChoiceChange = (option: string, checked: boolean) => {
    const currentQ = questions[currentQuestion];
    const currentAnswers = (answers[currentQ.id]?.value as string[]) || [];
    
    let newAnswers: string[];
    if (checked) {
      if (currentAnswers.length < (currentQ.maxSelect || 2)) {
        newAnswers = [...currentAnswers, option];
      } else {
        newAnswers = currentAnswers;
      }
    } else {
      newAnswers = currentAnswers.filter(ans => ans !== option);
    }
    
    handleAnswer(newAnswers);
  };

  const shouldShowQuestion = (question: Question, questionIndex: number) => {
    // Always show the first question
    if (questionIndex === 0) return true;
    
    // Check conditional logic for specific questions
    if (question.id === "energy_type_calc") {
      // Only show energy_type_calc if user doesn't know their energy type
      const energyTypeAnswer = answers["energy_type"];
      const shouldShow = energyTypeAnswer && energyTypeAnswer.value === "I'm not sure";
      return shouldShow;
    }
    
    // For all other questions, show them if the previous question has been answered
    const prevQuestion = questions[questionIndex - 1];
    const prevAnswer = answers[prevQuestion.id];
    
    // If the previous question is energy_type_calc, check if it should be shown
    if (prevQuestion.id === "energy_type_calc") {
      const energyTypeAnswer = answers["energy_type"];
      if (energyTypeAnswer && energyTypeAnswer.value !== "I'm not sure") {
        // Skip energy_type_calc, so check the question before that
        if (questionIndex > 1) {
          const prevPrevQuestion = questions[questionIndex - 2];
          const prevPrevAnswer = answers[prevPrevQuestion.id];
          const shouldShow = !!prevPrevAnswer;
          return shouldShow;
        }
      }
    }
    
    const shouldShow = !!prevAnswer;
    return shouldShow;
  };

  const getVisibleQuestions = () => {
    return questions.filter((_, index) => shouldShowQuestion(questions[index], index));
  };

  const canProceed = () => {
    const currentQ = questions[currentQuestion];
    const currentAnswer = answers[currentQ.id];
    
    if (!currentAnswer) return false;
    
    // For the last question, check if user is authenticated
    const isLastQuestion = getVisibleQuestions().findIndex(q => q.id === questions[currentQuestion].id) === getVisibleQuestions().length - 1;
    if (isLastQuestion) return true;
    
    if (currentQ.type === "multiChoice") {
      return (currentAnswer.value as string[]).length > 0;
    }
    
    if (currentQ.type === "birthInfo") {
      const birthData = currentAnswer.value as BirthInfo;
      return birthData.dob && birthData.birthPlace && birthData.timezone_offset !== undefined;
    }
    
    if (currentQ.type === "preferences") {
      const prefData = currentAnswer.value as Preferences;
      return prefData.budget && prefData.timeCommitment && prefData.sessionPreference;
    }
    
    if (currentQ.type === "finalPreferences") {
      const finalPrefData = currentAnswer.value as FinalPreferences;
      return finalPrefData.eligibleNonprofit && finalPrefData.productInterest;
    }
    
    if (currentQ.type === "text" || currentQ.type === "date" || currentQ.type === "time") {
      return (currentAnswer.value as string).trim().length > 0;
    }
    
    return true;
  };

  const submitQuiz = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare quiz data for backend
      const quizData = {
        // Birth information
        dateOfBirth: (answers["birth_info"]?.value as BirthInfo)?.dob,
        birthTime: (answers["birth_info"]?.value as BirthInfo)?.birthTime,
        birthPlace: (answers["birth_info"]?.value as BirthInfo)?.birthPlace,
        timezoneOffset: (answers["birth_info"]?.value as BirthInfo)?.timezone_offset,
        
        // Energy type
        energyType: answers["energy_type"]?.value,
        calculateEnergyType: answers["energy_type_calc"]?.value,
        
        // Wellness focus
        currentChallenge: answers["wellness_focus"]?.value,
        
        // Balance activities
        balanceActivities: answers["balance_activities"]?.value,
        
        // Preferences
        budget: (answers["preferences"]?.value as Preferences)?.budget,
        timeCommitment: (answers["preferences"]?.value as Preferences)?.timeCommitment,
        sessionPreference: (answers["preferences"]?.value as Preferences)?.sessionPreference,
        
        // Practitioner type
        practitionerType: answers["practitioner_type"]?.value,
        
        // Final preferences
        eligibleNonprofit: (answers["final_preferences"]?.value as FinalPreferences)?.eligibleNonprofit,
        productInterest: (answers["final_preferences"]?.value as FinalPreferences)?.productInterest,
        
        // Analytics
        completionTime: Math.round((Date.now() - quizStartTime) / 1000),
        timeSpentOnQuestions: [], // Could be enhanced to track per question
        skippedQuestions: [],
        totalQuestions: Object.keys(answers).length
      };

      // Submit directly to backend using API function
      const result = await quizApi.submit(quizData);
      
      // Store results in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('quizSessionId', (result as { sessionId: string }).sessionId);
        localStorage.setItem('quizResults', JSON.stringify((result as { results: unknown }).results));
        
        // Clear quiz progress
        localStorage.removeItem('quizProgress');
        localStorage.removeItem('quizAnswers');
      }
      
      // Navigate to results page
      router.push('/quiz-results');
      
    } catch (error) {
      console.error('Quiz submission error:', error);
      // Show error to user instead of fallback
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextQuestion = () => {
    const visibleQuestions = getVisibleQuestions();
    const currentVisibleIndex = visibleQuestions.findIndex(q => q.id === questions[currentQuestion].id);
    
    if (currentVisibleIndex < visibleQuestions.length - 1) {
      const nextVisibleQuestion = visibleQuestions[currentVisibleIndex + 1];
      const nextQ = questions.findIndex(q => q.id === nextVisibleQuestion.id);
      setCurrentQuestion(nextQ);
      if (typeof window !== 'undefined') {
        localStorage.setItem('quizProgress', nextQ.toString());
      }
    } else {
      // Only submit if we're actually on the last visible question
      submitQuiz();
    }
  };

  const prevQuestion = () => {
    const visibleQuestions = getVisibleQuestions();
    const currentVisibleIndex = visibleQuestions.findIndex(q => q.id === questions[currentQuestion].id);
    
    if (currentVisibleIndex > 0) {
      const prevVisibleQuestion = visibleQuestions[currentVisibleIndex - 1];
      const prevQ = questions.findIndex(q => q.id === prevVisibleQuestion.id);
      setCurrentQuestion(prevQ);
      if (typeof window !== 'undefined') {
        localStorage.setItem('quizProgress', prevQ.toString());
      }
    }
  };

  // Update current question when answers change to show/hide conditional questions
  const updateCurrentQuestionIfNeeded = () => {
    const visibleQuestions = getVisibleQuestions();
    const currentVisibleIndex = visibleQuestions.findIndex(q => q.id === questions[currentQuestion].id);
    
    // If current question is no longer visible, move to the next visible question
    if (currentVisibleIndex === -1) {
      const nextVisibleQuestion = visibleQuestions.find(q => {
        const qIndex = questions.findIndex(originalQ => originalQ.id === q.id);
        return qIndex > currentQuestion;
      });
      
      if (nextVisibleQuestion) {
        const nextQ = questions.findIndex(q => q.id === nextVisibleQuestion.id);
        setCurrentQuestion(nextQ);
        if (typeof window !== 'undefined') {
          localStorage.setItem('quizProgress', nextQ.toString());
        }
        
        // Show skip message
        setSkipMessage("Skipping irrelevant question...");
        setTimeout(() => setSkipMessage(null), 2000);
      }
    }
  };

  // Add a small delay to show the skip animation
  const [skipMessage, setSkipMessage] = useState<string | null>(null);

  const renderQuestionInput = () => {
    const currentQ = questions[currentQuestion];
    const currentAnswer = answers[currentQ.id];

    switch (currentQ.type) {
      case "birthInfo":
        const birthData = (currentAnswer?.value as BirthInfo) || {};
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-sm font-medium">Date of Birth</Label>
              <CustomDateInput
                value={birthData.dob || ""}
                onChange={(date) => handleAnswer({ ...birthData, dob: date })}
                max={new Date().toISOString().split('T')[0]}
                placeholder="Select your birth date"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthTime" className="text-sm font-medium">Time of Birth (if known)</Label>
              <CustomTimeInput
                value={birthData.birthTime || ""}
                onChange={(time) => handleAnswer({ ...birthData, birthTime: time })}
                placeholder="Select birth time"
                format="12h"
              />
              <p className="text-xs text-muted-foreground">This helps us calculate your astrological profile more accurately</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Place of Birth</Label>
              <CitySearch
                value={birthData.birthPlace || ""}
                onChange={(city, timezoneOffset) => {
                  handleAnswer({ 
                    ...birthData, 
                    birthPlace: city,
                    timezone_offset: timezoneOffset
                  });
                }}
                placeholder="Search for your birth city..."
                label=""
                required
              />
              <p className="text-xs text-muted-foreground">Select your birth city for accurate timezone calculations</p>
            </div>
            
            <div className="space-y-2">
              <TimezoneSelector
                value={birthData.timezone_offset ?? (currentTimezone ?? 0)}
                onChange={(timezoneOffset) => {
                  handleAnswer({ 
                    ...birthData, 
                    timezone_offset: timezoneOffset
                  });
                }}
                label="Birth Timezone"
                required={false}
                showCurrent={true}
              />
              <p className="text-xs text-muted-foreground">
                Select the timezone for your birth location. This ensures accurate astrological calculations.
              </p>
            </div>
            
            {birthData.dob && birthData.birthTime && birthData.birthPlace && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-2">Birth Information Summary</div>
                <div className="text-xs text-blue-700 space-y-1">
                  <div>Date: {new Date(birthData.dob).toLocaleDateString()}</div>
                  <div>Time: {birthData.birthTime} (Local Time)</div>
                  <div>Place: {birthData.birthPlace}</div>
                  <div>Timezone: UTC{birthData.timezone_offset && birthData.timezone_offset >= 0 ? '+' : ''}{birthData.timezone_offset}</div>
                </div>
              </div>
            )}
          </div>
        );

      case "preferences":
        const prefData = (currentAnswer?.value as Preferences) || {};
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Investment Range</Label>
              <RadioGroup
                value={prefData.budget || ""}
                onValueChange={(value) => handleAnswer({ ...prefData, budget: value })}
                className="space-y-3"
              >
                {["Under $50", "$50–$100", "$100–$200", "$200+"].map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <RadioGroupItem value={option} id={`budget-${index}`} />
                    <Label 
                      htmlFor={`budget-${index}`} 
                      className="text-sm cursor-pointer hover:text-primary transition-colors duration-200 flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Weekly Time Commitment</Label>
              <RadioGroup
                value={prefData.timeCommitment || ""}
                onValueChange={(value) => handleAnswer({ ...prefData, timeCommitment: value })}
                className="space-y-3"
              >
                {["Less than 1 hour", "1–2 hours", "3–5 hours", "5+ hours"].map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <RadioGroupItem value={option} id={`time-${index}`} />
                    <Label 
                      htmlFor={`time-${index}`} 
                      className="text-sm cursor-pointer hover:text-primary transition-colors duration-200 flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Session Preference</Label>
              <RadioGroup
                value={prefData.sessionPreference || ""}
                onValueChange={(value) => handleAnswer({ ...prefData, sessionPreference: value })}
                className="space-y-3"
              >
                {["In-person", "Online (Zoom, video call)", "Either is fine"].map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <RadioGroupItem value={option} id={`session-${index}`} />
                    <Label 
                      htmlFor={`session-${index}`} 
                      className="text-sm cursor-pointer hover:text-primary transition-colors duration-200 flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case "finalPreferences":
        const finalPrefData = (currentAnswer?.value as FinalPreferences) || {};
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Financial Support</Label>
              <p className="text-xs text-muted-foreground mb-3">Are you currently facing financial hardship or other challenges that may qualify you for free or subsidized therapy?</p>
              <RadioGroup
                value={finalPrefData.eligibleNonprofit || ""}
                onValueChange={(value) => handleAnswer({ ...finalPrefData, eligibleNonprofit: value })}
                className="space-y-3"
              >
                {["Yes", "No"].map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <RadioGroupItem value={option} id={`nonprofit-${index}`} />
                    <Label 
                      htmlFor={`nonprofit-${index}`} 
                      className="text-sm cursor-pointer hover:text-primary transition-colors duration-200 flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {finalPrefData.eligibleNonprofit === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="nonprofitReason" className="text-sm font-medium">Briefly describe your situation (Optional)</Label>
                <CustomTextInput
                  value={finalPrefData.nonprofitReason || ""}
                  onChange={(value) => handleAnswer({ ...finalPrefData, nonprofitReason: value })}
                  placeholder="Tell us about your circumstances..."
                  className="w-full"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Product Recommendations</Label>
              <p className="text-xs text-muted-foreground mb-3">Would you like to receive product recommendations (e.g., crystals, wellness tools) alongside your service suggestions?</p>
              <RadioGroup
                value={finalPrefData.productInterest || ""}
                onValueChange={(value) => handleAnswer({ ...finalPrefData, productInterest: value })}
                className="space-y-3"
              >
                {["Yes, please", "No, just services"].map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                    <RadioGroupItem value={option} id={`product-${index}`} />
                    <Label 
                      htmlFor={`product-${index}`} 
                      className="text-sm cursor-pointer hover:text-primary transition-colors duration-200 flex-1"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <CustomDateInput
              value={currentAnswer?.value as string || ""}
              onChange={(date) => handleAnswer(date)}
              max={new Date().toISOString().split('T')[0]}
              placeholder="Select date"
            />
            {currentAnswer?.value && (
              <p className="text-xs text-muted-foreground">
                Selected: {new Date(currentAnswer.value as string).toLocaleDateString()}
              </p>
            )}
          </div>
        );

      case "time":
        return (
          <div className="space-y-2">
            <CustomTimeInput
              value={currentAnswer?.value as string || ""}
              onChange={(time) => handleAnswer(time)}
              placeholder="Select time"
              format="24h"
            />
            {currentAnswer?.value && (
              <p className="text-xs text-muted-foreground">
                Selected: {currentAnswer.value as string}
              </p>
            )}
          </div>
        );

      case "text":
        return (
          <CustomTextInput
            value={currentAnswer?.value as string || ""}
            onChange={(value) => handleAnswer(value)}
            placeholder="Type your answer here..."
            className="w-full"
          />
        );

      case "singleChoice":
        return (
          <RadioGroup
            value={currentAnswer?.value as string || ""}
            onValueChange={(value) => handleAnswer(value)}
            className="space-y-4"
          >
            {currentQ.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-sm cursor-pointer hover:text-primary transition-colors duration-200 flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "multiChoice":
        const selectedOptions = (currentAnswer?.value as string[]) || [];
        return (
          <div className="space-y-4">
            {currentQ.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
                <Checkbox
                  id={`option-${index}`}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={(checked) => handleMultiChoiceChange(option, checked as boolean)}
                />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-sm cursor-pointer hover:text-primary transition-colors duration-200 flex-1"
                >
                  {option}
                </Label>
              </div>
            ))}
            {currentQ.maxSelect && (
              <p className="text-xs text-muted-foreground mt-2">
                Choose up to {currentQ.maxSelect} options
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };



  return (
    <QuizLayout>
      <LoginPrompt 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)} 
        action="booking"
      />
      <section className="section-padding min-h-[70vh] flex items-center">
        <div className="max-w-3xl mx-auto container-padding">
          <div className="text-center mb-12 fade-in">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Soul Path Discovery Quiz
            </h1>
                         <p className="text-lg text-muted-foreground">
               Answer a few questions to find your perfect healing journey
             </p>
             {skipMessage && (
               <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                 <p className="text-sm text-primary font-medium">{skipMessage}</p>
               </div>
             )}
          </div>
          
                     <Card className="modern-card slide-up transition-all duration-300 opacity-100">
            <CardHeader>
                             <div className="flex justify-between items-center mb-4">
                 <span className="text-sm text-muted-foreground">
                   Question {getVisibleQuestions().findIndex(q => q.id === questions[currentQuestion].id) + 1} of {getVisibleQuestions().length}
                 </span>
                                   <div className="flex space-x-1">
                    {questions.map((question, index) => {
                      const isVisible = shouldShowQuestion(question, index);
                      const isCurrent = question.id === questions[currentQuestion].id;
                      const isCompleted = answers[question.id];
                      
                      return (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-200 ${
                            !isVisible ? 'bg-gray-300 opacity-30' :
                            isCurrent ? 'bg-primary' :
                            isCompleted ? 'bg-primary/60' : 'bg-muted'
                          }`}
                          title={!isVisible ? 'Question skipped' : question.question}
                        />
                      );
                    })}
                  </div>
               </div>
              <CardTitle className="text-xl flex items-center gap-3">
                {getQuestionIcon(questions[currentQuestion].type)}
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderQuestionInput()}
              
              {/* Show authentication message on last question */}
              {getVisibleQuestions().findIndex(q => q.id === questions[currentQuestion].id) === getVisibleQuestions().length - 1 && !isAuthenticated && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Please sign in to get your personalized results and save your recommendations.
                  </p>
                </div>
              )}
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={!canProceed() || isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                                         <>
                       {getVisibleQuestions().findIndex(q => q.id === questions[currentQuestion].id) === getVisibleQuestions().length - 1 ? 'Get Results' : 'Next'}
                       <ArrowRight className="w-4 h-4 ml-2" />
                     </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </QuizLayout>
  );
};

export default Quiz;