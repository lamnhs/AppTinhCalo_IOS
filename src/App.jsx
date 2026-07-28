import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  BookOpen, 
  User, 
  Plus, 
  X, 
  Search, 
  QrCode, 
  Sparkles, 
  Mic, 
  Droplet, 
  Activity, 
  Scale, 
  FileText, 
  Apple, 
  ChevronRight, 
  Utensils, 
  TrendingUp, 
  Key, 
  AlertCircle, 
  Check, 
  Calendar,
  Zap,
  Info,
  Trash2,
  Lock,
  Settings,
  Camera,
  Image
} from 'lucide-react';
import './App.css';

// Pre-defined healthy Vietnamese recipes for "Gợi ý công thức"
const HEALTHY_RECIPES = [
  { id: 1, name: "Cháo yến mạch chuối tiêu", type: "breakfast", calories: 320, protein: 9, carbs: 58, fat: 5, ingredients: "Yến mạch (50g), Chuối tiêu (1 quả), Sữa tươi không đường (150ml), Hạt chia (1 muỗng)." },
  { id: 2, name: "Trứng cuộn rau củ & bánh mì đen", type: "breakfast", calories: 290, protein: 16, carbs: 24, fat: 12, ingredients: "Trứng gà (2 quả), Ớt chuông & hành tây băm nhỏ, Bánh mì nguyên cám (1 lát)." },
  { id: 3, name: "Salad ức gà áp chảo sốt mè", type: "lunch", calories: 380, protein: 35, carbs: 12, fat: 18, ingredients: "Ức gà (150g), Xà lách, Cà chua bi, Dưa leo, Sốt mè rang mè đen (1 muỗng canh)." },
  { id: 4, name: "Cá hồi nướng măng tây", type: "dinner", calories: 450, protein: 32, carbs: 8, fat: 28, ingredients: "Cá hồi phi lê (130g), Măng tây (100g), Dầu ô liu (1 muỗng cà phê), Tỏi băm, Chanh." },
  { id: 5, name: "Bò áp chảo & bông cải xanh", type: "lunch", calories: 420, protein: 30, carbs: 15, fat: 22, ingredients: "Thịt bò thăn (120g), Bông cải xanh luộc (150g), Tỏi, Dầu ô liu." }
];

// Mock dishes for AI image analysis in Demo mode
const MOCK_DISHES = [
  {
    name: "Phở Bò Hà Nội",
    totalCalories: 550,
    totalProteinGrams: 23.5,
    totalCarbsGrams: 54,
    totalFatGrams: 25,
    analysisSummary: "Phở bò truyền thống giàu đạm tinh khiết từ thịt bò nạc và tinh bột dễ hấp thụ từ bánh phở. Nước dùng có chứa muối và chất béo, bạn nên hạn chế húp toàn bộ nước dùng nếu muốn siết cân.",
    foodItems: [
      { name: "Bánh phở", weightGrams: 150, calories: 220, proteinGrams: 4.5, carbsGrams: 48, fatGrams: 1 },
      { name: "Thịt bò nạc thái mỏng", weightGrams: 60, calories: 150, proteinGrams: 16, carbsGrams: 0, fatGrams: 9 },
      { name: "Nước dùng phở & hành ngò", weightGrams: 350, calories: 180, proteinGrams: 3, carbsGrams: 6, fatGrams: 15 }
    ]
  },
  {
    name: "Cơm Tấm Sườn Bì Chả",
    totalCalories: 750,
    totalProteinGrams: 38,
    totalCarbsGrams: 61,
    totalFatGrams: 39,
    analysisSummary: "Bữa cơm dồi dào năng lượng và giàu protein. Hãy lưu ý lượng chất béo bão hòa từ sườn nướng mỡ hành và chả trứng chưng khá cao, bạn nên ăn kèm nhiều dưa leo chua để hỗ trợ tiêu hóa.",
    foodItems: [
      { name: "Cơm tấm hạt vỡ", weightGrams: 150, calories: 240, proteinGrams: 5, carbsGrams: 53, fatGrams: 1 },
      { name: "Sườn heo nướng mật ong", weightGrams: 100, calories: 320, proteinGrams: 22, carbsGrams: 2, fatGrams: 24 },
      { name: "Chả chưng trứng thịt", weightGrams: 50, calories: 110, proteinGrams: 7, carbsGrams: 4, fatGrams: 8 },
      { name: "Bì thính & mỡ hành", weightGrams: 40, calories: 80, proteinGrams: 5, carbsGrams: 2, fatGrams: 6 }
    ]
  },
  {
    name: "Salad Ức Gà Áp Chảo",
    totalCalories: 380,
    totalProteinGrams: 38.3,
    totalCarbsGrams: 7.6,
    totalFatGrams: 18.5,
    analysisSummary: "Bữa ăn eatclean lý tưởng cho việc siết cơ giảm mỡ, cực kỳ dồi dào protein từ ức gà áp chảo và trứng luộc lòng đào. Sốt mè rang chứa chất béo tốt nhưng nên dùng chừng mực.",
    foodItems: [
      { name: "Ức gà fillet áp chảo", weightGrams: 120, calories: 180, proteinGrams: 31, carbsGrams: 0, fatGrams: 3.5 },
      { name: "Trứng luộc", weightGrams: 50, calories: 75, proteinGrams: 6.3, carbsGrams: 0.6, fatGrams: 5.3 },
      { name: "Rau xà lách & cà chua bi", weightGrams: 150, calories: 25, proteinGrams: 1, carbsGrams: 4, fatGrams: 0.2 },
      { name: "Sốt mè rang Kewpie", weightGrams: 20, calories: 100, proteinGrams: 1, carbsGrams: 3, fatGrams: 9.5 }
    ]
  },
  {
    name: "Bún Thịt Nướng Chả Giò",
    totalCalories: 850,
    totalProteinGrams: 35,
    totalCarbsGrams: 85,
    totalFatGrams: 42,
    analysisSummary: "Tô bún thịt nướng chả giò vô cùng hấp dẫn và dồi dào năng lượng! Thành phần gồm thịt heo nướng mỡ hành đậm đà, chả giò chiên giòn rụm, bún tươi và nước mắm chua ngọt. Hàm lượng calo và chất béo tương đối cao (850 kcal), rất phù hợp nạp năng lượng sau buổi tập luyện.",
    foodItems: [
      { name: "Bún tươi", weightGrams: 200, calories: 220, proteinGrams: 4, carbsGrams: 48, fatGrams: 1 },
      { name: "Thịt heo nướng mỡ hành", weightGrams: 120, calories: 350, proteinGrams: 24, carbsGrams: 4, fatGrams: 26 },
      { name: "Chả giò chiên giòn (2 cuốn)", weightGrams: 80, calories: 200, proteinGrams: 6, carbsGrams: 18, fatGrams: 12 },
      { name: "Nước mắm chua ngọt & Đồ chua", weightGrams: 60, calories: 80, proteinGrams: 1, carbsGrams: 15, fatGrams: 3 }
    ]
  },
  {
    name: "Pizza Pepperoni phô mai",
    totalCalories: 680,
    totalProteinGrams: 28,
    totalCarbsGrams: 64,
    totalFatGrams: 34,
    analysisSummary: "Bánh Pizza Pepperoni thơm nức với phô mai Mozzarella tan chảy và xúc xích cay đậm đà. Bữa ăn giàu tinh bột và chất béo bão hòa (680 kcal), khuyến nghị dùng chừng mực nếu bạn đang theo chế độ giảm mỡ.",
    foodItems: [
      { name: "Đế bánh pizza", weightGrams: 140, calories: 310, proteinGrams: 8, carbsGrams: 56, fatGrams: 6 },
      { name: "Phô mai Mozzarella chảy", weightGrams: 60, calories: 210, proteinGrams: 12, carbsGrams: 2, fatGrams: 16 },
      { name: "Xúc xích Pepperoni", weightGrams: 40, calories: 160, proteinGrams: 8, carbsGrams: 6, fatGrams: 12 }
    ]
  },
  {
    name: "Set Sushi Cá Hồi Nhật Bản",
    totalCalories: 520,
    totalProteinGrams: 32,
    totalCarbsGrams: 68,
    totalFatGrams: 14,
    analysisSummary: "Set Sushi cá hồi tươi ngon giàu Omega-3 từ cá hồi Na Uy và chất đạm tinh khiết. Cơm giấm dẻo hạt hỗ trợ năng lượng kéo dài, lượng béo bão hòa rất thấp phù hợp duy trì vóc dáng.",
    foodItems: [
      { name: "Cơm trộn giấm sushi", weightGrams: 180, calories: 260, proteinGrams: 5, carbsGrams: 58, fatGrams: 1 },
      { name: "Cá hồi Na Uy tươi (Nigiri)", weightGrams: 100, calories: 200, proteinGrams: 22, carbsGrams: 0, fatGrams: 12 },
      { name: "Rong biển nướng & Trứng nướng", weightGrams: 40, calories: 60, proteinGrams: 5, carbsGrams: 10, fatGrams: 1 }
    ]
  },
  {
    name: "Bánh Mì Thập Cẩm Chả Lụa",
    totalCalories: 460,
    totalProteinGrams: 21,
    totalCarbsGrams: 52,
    totalFatGrams: 19,
    analysisSummary: "Ổ bánh mì thập cẩm đặc ruột vỏ giòn rụm! Nhân gồm chả lụa, thịt nguội, pate gan béo ngậy và dưa chua giòn ngọt. Cung cấp năng lượng bữa sáng nhanh gọn, nhiều protein và tinh bột.",
    foodItems: [
      { name: "Vỏ bánh mì giòn đặc ruột", weightGrams: 90, calories: 230, proteinGrams: 7, carbsGrams: 46, fatGrams: 2 },
      { name: "Chả lụa & Thịt nguội", weightGrams: 60, calories: 140, proteinGrams: 12, carbsGrams: 2, fatGrams: 9 },
      { name: "Pate gan & Mỡ hành dưa chua", weightGrams: 30, calories: 90, proteinGrams: 2, carbsGrams: 4, fatGrams: 8 }
    ]
  }
];

const QUICK_FAVORITES = [
  {
    name: "300ml Whey Protein",
    icon: "🥤",
    subtitle: "160 kcal • 27g Đạm",
    totalCalories: 160,
    totalProteinGrams: 27,
    totalCarbsGrams: 3,
    totalFatGrams: 2,
    analysisSummary: "Thức uống Whey Protein 300ml hấp thụ nhanh, dồi dào đạm tinh khiết cho phục hồi và phát triển cơ bắp.",
    foodItems: [
      { name: "Whey Protein (1 muỗng scoop)", weightGrams: 30, calories: 120, proteinGrams: 25, carbsGrams: 2, fatGrams: 1.5 },
      { name: "Nước lọc pha (300ml)", weightGrams: 300, calories: 0, proteinGrams: 0, carbsGrams: 0, fatGrams: 0 },
      { name: "Sữa/Topping dầm nhẹ", weightGrams: 50, calories: 40, proteinGrams: 2, carbsGrams: 1, fatGrams: 0.5 }
    ]
  },
  {
    name: "Bún Thịt Nướng",
    icon: "🍜",
    subtitle: "410 kcal • 28g Đạm (Thịt nạc, ít bún)",
    totalCalories: 410,
    totalProteinGrams: 28,
    totalCarbsGrams: 34,
    totalFatGrams: 9,
    analysisSummary: "Tô Bún thịt nướng Eatclean chuẩn chỉnh: 100% thịt nạc nướng không mỡ hành, không hành phi, nhiều rau tươi & ít bún giúp tối ưu calo tối đa.",
    foodItems: [
      { name: "Bún tươi (Ít bún - 120g)", weightGrams: 120, calories: 140, proteinGrams: 2.5, carbsGrams: 30, fatGrams: 0.5 },
      { name: "Thịt heo nạc fillet nướng (Không mỡ hành, không hành phi)", weightGrams: 120, calories: 210, proteinGrams: 24.5, carbsGrams: 1, fatGrams: 8 },
      { name: "Rau sống nhiều & Nước mắm chua ngọt nhẹ", weightGrams: 120, calories: 60, proteinGrams: 1, carbsGrams: 3, fatGrams: 0.5 }
    ]
  },
  {
    name: "Cơm Sườn (Không mỡ hành, ít cơm)",
    icon: "🥩",
    subtitle: "520 kcal • Ít béo & Calo",
    totalCalories: 520,
    totalProteinGrams: 28,
    totalCarbsGrams: 45,
    totalFatGrams: 22,
    analysisSummary: "Dĩa cơm sườn phiên bản lành mạnh: Không rưới mỡ hành, lượng cơm ít hơn thường lệ để siết calo tối đa.",
    foodItems: [
      { name: "Cơm tấm (Ít cơm - 1/2 chén)", weightGrams: 100, calories: 160, proteinGrams: 3, carbsGrams: 35, fatGrams: 1 },
      { name: "Sườn heo nướng nạc", weightGrams: 110, calories: 330, proteinGrams: 24, carbsGrams: 2, fatGrams: 20 },
      { name: "Dưa leo & Nước mắm ớt", weightGrams: 50, calories: 30, proteinGrams: 1, carbsGrams: 8, fatGrams: 1 }
    ]
  },
  {
    name: "5 Cái Gỏi Cuốn Nhỏ",
    icon: "🌯",
    subtitle: "350 kcal • 18g Đạm",
    totalCalories: 350,
    totalProteinGrams: 18,
    totalCarbsGrams: 42,
    totalFatGrams: 10,
    analysisSummary: "5 cuốn gỏi cuốn tôm thịt rau sống thanh mát, ăn kèm tương hột béo nhẹ, vừa đủ đạm và chất xơ.",
    foodItems: [
      { name: "Bánh tráng & Bún tươi", weightGrams: 100, calories: 150, proteinGrams: 3, carbsGrams: 32, fatGrams: 1 },
      { name: "Tôm luộc & Thịt heo nạc (5 cuốn)", weightGrams: 100, calories: 140, proteinGrams: 14, carbsGrams: 1, fatGrams: 6 },
      { name: "Nước chấm tương hột & Đồ chua", weightGrams: 40, calories: 60, proteinGrams: 1, carbsGrams: 9, fatGrams: 3 }
    ]
  },
  {
    name: "1 Trái Chuối",
    icon: "🍌",
    subtitle: "105 kcal • 27g Carbs",
    totalCalories: 105,
    totalProteinGrams: 1.3,
    totalCarbsGrams: 27,
    totalFatGrams: 0.3,
    analysisSummary: "Chuối tươi dồi dào Kali và chất xơ, nạp năng lượng tinh bột lành mạnh trước hoặc sau khi tập luyện.",
    foodItems: [
      { name: "Chuối tiêu vừa (1 trái)", weightGrams: 118, calories: 105, proteinGrams: 1.3, carbsGrams: 27, fatGrams: 0.3 }
    ]
  },
  {
    name: "1 Quả Táo Đỏ",
    icon: "🍎",
    subtitle: "95 kcal • Giàu chất xơ",
    totalCalories: 95,
    totalProteinGrams: 0.5,
    totalCarbsGrams: 25,
    totalFatGrams: 0.3,
    analysisSummary: "Táo tươi ngọt giòn giàu Vitamin C và chất xơ tự nhiên hỗ trợ tiêu hóa tốt.",
    foodItems: [
      { name: "Táo đỏ tươi (1 quả)", weightGrams: 182, calories: 95, proteinGrams: 0.5, carbsGrams: 25, fatGrams: 0.3 }
    ]
  },
  {
    name: "1 Chai Nước Revive",
    icon: "⚡",
    subtitle: "100 kcal • Bù điện giải",
    totalCalories: 100,
    totalProteinGrams: 0,
    totalCarbsGrams: 25,
    totalFatGrams: 0,
    analysisSummary: "Nước uống vận động Revive giúp giải khát cấp tốc, bổ sung khoáng chất và bù đắp khoáng chất mất đi qua mồ hôi.",
    foodItems: [
      { name: "Nước Revive chai 500ml", weightGrams: 500, calories: 100, proteinGrams: 0, carbsGrams: 25, fatGrams: 0 }
    ]
  }
];

function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState('home');
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // State controls for popups and overlay menu
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReportWeekIndex, setSelectedReportWeekIndex] = useState(0);
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);
  const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [activeMealForAdd, setActiveMealForAdd] = useState('breakfast');
  const [toast, setToast] = useState(null);
  const [isWeightLogModalOpen, setIsWeightLogModalOpen] = useState(false);
  const [weightInputVal, setWeightInputVal] = useState('');
  const [isConsumedDetailOpen, setIsConsumedDetailOpen] = useState(false);
  const [isExerciseDetailOpen, setIsExerciseDetailOpen] = useState(false);
  const [isPhotoSourceModalOpen, setIsPhotoSourceModalOpen] = useState(false);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const videoRef = useRef(null);

  const startLiveCamera = async () => {
    try {
      setIsPhotoSourceModalOpen(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: { ideal: 'environment' }, 
          aspectRatio: { ideal: 0.75 },
          width: { ideal: 1080 }, 
          height: { ideal: 1440 } 
        }
      });
      setCameraStream(stream);
      setIsLiveCameraOpen(true);
    } catch (err) {
      console.warn('Live camera permission or support unavailable, falling back to file input:', err);
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    }
  };

  const stopLiveCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsLiveCameraOpen(false);
  };

  const captureLivePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUri = canvas.toDataURL('image/jpeg', 0.85);
    
    stopLiveCamera();

    // Reset date to today's date for scanning
    setCurrentDate(new Date().toISOString().split('T')[0]);

    setIsPlusOpen(false);
    setIsScanDetailsOpen(true);
    setIsScanning(true);
    setSelectedImage(dataUri);
    setScannedResult(null);

    executePhotoAnalysis(dataUri, 'live_camera_capture.jpg');
  };

  // Pre-configured Gemini API Key (Gemini AppCalo project)
  const DEFAULT_KEY = atob('QVEuQWI4Uk42S0dWZnQ0ekJNR3ltRVZYbWlqbGtNazF5a1ZCNzZxTURSNVh0V0hxNkNMUEE=');

  const [apiKey, setApiKey] = useState(() => {
    const saved = localStorage.getItem('wao_api_key');
    // If no saved key or if stored key is the old broken key, auto-update to working DEFAULT_KEY
    if (!saved || saved.includes('AQ.Ab8RN6Jjk')) {
      localStorage.setItem('wao_api_key', DEFAULT_KEY);
      return DEFAULT_KEY;
    }
    return saved;
  });

  // User body profile targets
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('wao_profile');
    if (saved) return JSON.parse(saved);
    return {
      gender: 'male',
      age: 26,
      height: 173,
      weight: 69,
      targetWeight: 64,
      activityLevel: 'moderate',
      goal: 'lose',
      calTarget: 2386, // Match default screenshot
      proteinTarget: 119, // Match default screenshot
      carbsTarget: 298,   // Match default screenshot
      fatTarget: 80,      // Match default screenshot
      waterTarget: 2200,
      bmi: 23.1,
      bmiClass: 'Bình thường'
    };
  });

  // Daily log database
  const [dateLogs, setDateLogs] = useState(() => {
    const saved = localStorage.getItem('wao_logs');
    if (saved) return JSON.parse(saved);
    return {};
  });

  // Camera / Scan States
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scannedResult, setScannedResult] = useState(null);
  const [isScanDetailsOpen, setIsScanDetailsOpen] = useState(false);

  // Voice recognition mockup typing input
  const [voiceText, setVoiceText] = useState('');
  const [isVoiceProcessing, setIsVoiceProcessing] = useState(false);

  // Manual inputs
  const [manualFood, setManualFood] = useState({
    name: '', calories: '', protein: '', carbs: '', fat: '', weight: '100'
  });

  // Activity exercise input
  const [exerciseInput, setExerciseInput] = useState({
    name: 'Chạy bộ', calories: '250'
  });

  // Calculator form inputs
  const [calcInputs, setCalcInputs] = useState({
    gender: profile.gender,
    age: profile.age,
    height: profile.height,
    weight: profile.weight,
    targetWeight: profile.targetWeight || 64,
    activityLevel: profile.activityLevel,
    goal: profile.goal
  });

  // Save changes triggers
  useEffect(() => {
    localStorage.setItem('wao_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('wao_logs', JSON.stringify(dateLogs));
  }, [dateLogs]);

  // Sync scannedResult to editableItems
  const [editableItems, setEditableItems] = useState([]);

  useEffect(() => {
    if (scannedResult && scannedResult.foodItems) {
      setEditableItems(scannedResult.foodItems.map(item => {
        const p = item.proteinGrams !== undefined ? item.proteinGrams : (item.protein !== undefined ? item.protein : 0);
        const c = item.carbsGrams !== undefined ? item.carbsGrams : (item.carbs !== undefined ? item.carbs : 0);
        const f = item.fatGrams !== undefined ? item.fatGrams : (item.fat !== undefined ? item.fat : 0);
        return {
          ...item,
          protein: p,
          carbs: c,
          fat: f,
          originalWeight: item.weightGrams,
          originalCalories: item.calories,
          originalProtein: p,
          originalCarbs: c,
          originalFat: f
        };
      }));
    } else {
      setEditableItems([]);
    }
  }, [scannedResult]);

  const handleWeightChange = (idx, newWeight) => {
    const weight = Math.max(0, Number(newWeight) || 0);
    setEditableItems(prev => {
      const updated = [...prev];
      const item = updated[idx];
      const ratio = item.originalWeight > 0 ? (weight / item.originalWeight) : 1;
      
      updated[idx] = {
        ...item,
        weightGrams: weight,
        calories: Math.round(item.originalCalories * ratio),
        protein: Math.round(item.originalProtein * ratio),
        carbs: Math.round(item.originalCarbs * ratio),
        fat: Math.round(item.originalFat * ratio)
      };
      return updated;
    });
  };

  const getRecalculatedTotals = () => {
    return editableItems.reduce((acc, item) => {
      acc.calories += Number(item.calories) || 0;
      acc.protein += Number(item.protein) || 0;
      acc.carbs += Number(item.carbs) || 0;
      acc.fat += Number(item.fat) || 0;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const scanTotals = getRecalculatedTotals();

  // Toast notifier helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Switch Date Selection
  const handleDateChange = (dateStr) => {
    setCurrentDate(dateStr);
  };

  const getDefaultExercises = (weightToUse) => {
    const w = weightToUse || profile.weight;
    const { height, age, gender } = profile;
    
    // BMR (Mifflin)
    let bmr = 10 * w + 6.25 * height - 5 * age;
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;
    bmr = Math.round(bmr);

    return [
      {
        id: 'default-bmr',
        name: 'Chuyển hóa cơ bản (Trao đổi chất)',
        calories: bmr,
        isDefault: true
      }
    ];
  };

  const recalculateProfileWithWeight = (newWeight) => {
    const { gender, age, height, activityLevel, targetWeight } = profile;
    const nW = Number(newWeight);
    const tW = Number(targetWeight) || nW;
    
    let autoGoal = 'maintain';
    if (tW < nW) autoGoal = 'lose';
    else if (tW > nW) autoGoal = 'gain';

    // BMI
    const hM = height / 100;
    const bmiVal = Number((nW / (hM * hM)).toFixed(1));
    let classification = "Bình thường";
    if (bmiVal < 18.5) classification = "Thiếu cân";
    else if (bmiVal >= 25 && bmiVal < 29.9) classification = "Thừa cân";
    else if (bmiVal >= 29.9) classification = "Béo phì";

    // BMR (Mifflin)
    let bmr = 10 * nW + 6.25 * height - 5 * age;
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    // TDEE
    let actMult = 1.2;
    if (activityLevel === 'light') actMult = 1.375;
    else if (activityLevel === 'moderate') actMult = 1.55;
    else if (activityLevel === 'active') actMult = 1.725;
    else if (activityLevel === 'heavy') actMult = 1.9;
    
    const tdee = bmr * actMult;

    // Target Calories
    let targetCals = Math.round(tdee);
    if (autoGoal === 'lose') targetCals = Math.round(tdee - 500);
    else if (autoGoal === 'gain') targetCals = Math.round(tdee + 400);

    targetCals = Math.max(targetCals, gender === 'male' ? 1400 : 1200);

    // Macros
    let protMult = 1.6;
    if (autoGoal === 'lose') protMult = 2.0;
    else if (autoGoal === 'gain') protMult = 1.8;
    
    const proteinTarget = Math.round(nW * protMult);
    const fatTarget = Math.round((targetCals * 0.25) / 9);
    const carbsTarget = Math.round((targetCals - (proteinTarget * 4) - (fatTarget * 9)) / 4);

    const waterTarget = Math.round(nW * 35);

    const updatedProfile = {
      ...profile,
      weight: nW,
      goal: autoGoal,
      calTarget: targetCals,
      proteinTarget,
      carbsTarget,
      fatTarget,
      waterTarget: Math.round(waterTarget / 100) * 100,
      bmi: bmiVal,
      bmiClass: classification
    };

    setProfile(updatedProfile);
    localStorage.setItem('wao_profile', JSON.stringify(updatedProfile));
    
    // Also save/update active log weight
    updateCurrentLog({
      weight: Number(newWeight)
    });
  };

  // Backup & Restore Data Functions
  const backupInputRef = useRef(null);

  const handleExportBackup = () => {
    try {
      const backupData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        profile: profile,
        dateLogs: dateLogs,
        apiKey: apiKey
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `lamba_calorie_backup_${currentDate}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Đã tải tệp sao lưu .json về thiết bị!', 'success');
    } catch (err) {
      console.error('Export error:', err);
      showToast('Lỗi khi sao lưu dữ liệu!', 'error');
    }
  };

  const handleImportBackup = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (importedData.profile) {
          setProfile(importedData.profile);
          localStorage.setItem('wao_profile', JSON.stringify(importedData.profile));
        }
        if (importedData.dateLogs) {
          setDateLogs(importedData.dateLogs);
          localStorage.setItem('wao_date_logs', JSON.stringify(importedData.dateLogs));
        }
        if (importedData.apiKey) {
          setApiKey(importedData.apiKey);
          localStorage.setItem('gemini_api_key', importedData.apiKey);
        }
        showToast('Khôi phục dữ liệu thành công!', 'success');
      } catch (err) {
        console.error('Import error:', err);
        showToast('Tệp sao lưu không hợp lệ!', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Get date log or create default empty log
  const getActiveDayLog = () => {
    const todayDefaultEx = getDefaultExercises(profile.weight);
    if (!dateLogs[currentDate]) {
      const defaultTotalExercise = todayDefaultEx.reduce((sum, e) => sum + e.calories, 0);
      return {
        meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
        water: 0,
        exercise: defaultTotalExercise,
        exercises: todayDefaultEx,
        weight: profile.weight
      };
    }
    const log = dateLogs[currentDate];
    const rawExercises = log.exercises || [];
    
    // Clean old defaults and ensure only the single new metabolic default exists
    const userExercises = rawExercises.filter(ex => !ex.isDefault);
    const exercisesToUse = [...todayDefaultEx, ...userExercises];
    const totalExercise = exercisesToUse.reduce((sum, e) => sum + e.calories, 0);

    return {
      meals: log.meals || { breakfast: [], lunch: [], dinner: [], snack: [] },
      water: log.water || 0,
      exercise: totalExercise,
      exercises: exercisesToUse,
      weight: log.weight || profile.weight
    };
  };

  const currentLog = getActiveDayLog();

  const updateCurrentLog = (updatedFields) => {
    setDateLogs(prev => ({
      ...prev,
      [currentDate]: {
        ...prev[currentDate],
        ...updatedFields
      }
    }));
  };

  // Get total macro and calorie values consumed
  const calculateTotalConsumptions = () => {
    let cal = 0, p = 0, c = 0, f = 0;
    Object.values(currentLog.meals).forEach(mealArray => {
      mealArray.forEach(item => {
        cal += Number(item.calories) || 0;
        p += Number(item.protein) || 0;
        c += Number(item.carbs) || 0;
        f += Number(item.fat) || 0;
      });
    });
    return {
      calories: Math.round(cal),
      protein: Math.round(p),
      carbs: Math.round(c),
      fat: Math.round(f)
    };
  };

  const consumed = calculateTotalConsumptions();
  // CalRemaining = Target - Food + Exercise (extra exercises only to avoid double counting BMR/TDEE)
  const extraExerciseCals = currentLog.exercises
    .filter(ex => !ex.isDefault)
    .reduce((sum, ex) => sum + ex.calories, 0);
  const calRemaining = profile.calTarget - consumed.calories + extraExerciseCals;

  // Add Manual Food
  const handleAddManualFood = (e) => {
    e.preventDefault();
    if (!manualFood.name || !manualFood.calories) {
      showToast('Vui lòng nhập tên món và lượng Calo!', 'warning');
      return;
    }

    const newItem = {
      id: Date.now(),
      name: manualFood.name,
      calories: Number(manualFood.calories),
      protein: Number(manualFood.protein) || 0,
      carbs: Number(manualFood.carbs) || 0,
      fat: Number(manualFood.fat) || 0,
      weightGrams: Number(manualFood.weight) || 100
    };

    const mealList = [...(currentLog.meals[activeMealForAdd] || [])];
    mealList.push(newItem);

    updateCurrentLog({
      meals: {
        ...currentLog.meals,
        [activeMealForAdd]: mealList
      }
    });

    setIsAddFoodOpen(false);
    setManualFood({ name: '', calories: '', protein: '', carbs: '', fat: '', weight: '100' });
    showToast(`Đã thêm ${newItem.name} thành công!`, 'success');
  };

  // Delete logged food item
  const handleDeleteFood = (mealType, itemId) => {
    const updatedList = currentLog.meals[mealType].filter(item => item.id !== itemId);
    updateCurrentLog({
      meals: {
        ...currentLog.meals,
        [mealType]: updatedList
      }
    });
    showToast('Đã xóa món ăn.', 'info');
  };

  // Add Water Log
  const handleAddWater = (amount) => {
    const newWater = Math.max(0, currentLog.water + amount);
    updateCurrentLog({ water: newWater });
    showToast(`Đã ghi nhận +${amount}ml nước.`, 'success');
  };

  // Add activity log manually
  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!exerciseInput.calories) return;

    const newExerciseItem = {
      id: Date.now(),
      name: exerciseInput.name || 'Hoạt động thể chất',
      calories: Number(exerciseInput.calories)
    };

    const exerciseList = [...(currentLog.exercises || [])];
    exerciseList.push(newExerciseItem);

    const totalExerciseCals = exerciseList.reduce((acc, curr) => acc + curr.calories, 0);

    updateCurrentLog({
      exercises: exerciseList,
      exercise: totalExerciseCals
    });

    setIsActivityModalOpen(false);
    showToast(`Đã ghi nhận hoạt động: ${newExerciseItem.name} (-${newExerciseItem.calories} Calo)`, 'success');
  };

  // Add activity log via preset
  const handleAddPresetExercise = (name, calories) => {
    const newExerciseItem = {
      id: Date.now(),
      name,
      calories: Number(calories)
    };

    const exerciseList = [...(currentLog.exercises || [])];
    exerciseList.push(newExerciseItem);

    const totalExerciseCals = exerciseList.reduce((acc, curr) => acc + curr.calories, 0);

    updateCurrentLog({
      exercises: exerciseList,
      exercise: totalExerciseCals
    });

    setIsActivityModalOpen(false);
    showToast(`Đã ghi nhận hoạt động: ${name} (-${calories} Calo)`, 'success');
  };

  // Delete logged activity
  const handleDeleteExercise = (itemId) => {
    const updatedList = currentLog.exercises.filter(item => item.id !== itemId);
    const totalCals = updatedList.reduce((acc, curr) => acc + curr.calories, 0);
    updateCurrentLog({
      exercises: updatedList,
      exercise: totalCals
    });
    showToast('Đã xóa hoạt động thể chất.', 'info');
  };

  // BMI/Targets recalculations
  const processCalculations = (e) => {
    e.preventDefault();
    const { gender, age, height, weight, targetWeight, activityLevel } = calcInputs;
    const w = Number(weight);
    const tw = Number(targetWeight) || w;

    let autoGoal = 'maintain';
    if (tw < w) autoGoal = 'lose';
    else if (tw > w) autoGoal = 'gain';

    // BMI
    const heightM = height / 100;
    const bmiVal = Number((w / (heightM * heightM)).toFixed(1));
    let classification = 'Bình thường';
    if (bmiVal < 18.5) classification = 'Thiếu cân';
    else if (bmiVal >= 18.5 && bmiVal < 24.9) classification = 'Bình thường';
    else if (bmiVal >= 25 && bmiVal < 29.9) classification = 'Thừa cân';
    else classification = 'Béo phì';

    // BMR (Mifflin)
    let bmr = 10 * w + 6.25 * height - 5 * age;
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    // TDEE
    let actMult = 1.2;
    if (activityLevel === 'light') actMult = 1.375;
    else if (activityLevel === 'moderate') actMult = 1.55;
    else if (activityLevel === 'active') actMult = 1.725;
    else if (activityLevel === 'heavy') actMult = 1.9;
    
    const tdee = bmr * actMult;

    // Goals
    let targetCals = Math.round(tdee);
    if (autoGoal === 'lose') targetCals = Math.round(tdee - 500);
    else if (autoGoal === 'gain') targetCals = Math.round(tdee + 400);

    targetCals = Math.max(targetCals, gender === 'male' ? 1400 : 1200);

    // Macros Ratios
    let protMult = 1.6;
    if (autoGoal === 'lose') protMult = 2.0;
    else if (autoGoal === 'gain') protMult = 1.8;
    
    const proteinTarget = Math.round(w * protMult);
    const fatTarget = Math.round((targetCals * 0.25) / 9);
    const carbsTarget = Math.round((targetCals - (proteinTarget * 4) - (fatTarget * 9)) / 4);

    const waterTarget = Math.round(w * 35);

    setProfile({
      gender,
      age: Number(age),
      height: Number(height),
      weight: w,
      targetWeight: tw,
      activityLevel,
      goal: autoGoal,
      calTarget: targetCals,
      proteinTarget,
      carbsTarget,
      fatTarget,
      waterTarget: Math.round(waterTarget / 100) * 100,
      bmi: bmiVal,
      bmiClass: classification
    });

    setIsCalculatorOpen(false);
    showToast('Đã cập nhật chỉ số & mục tiêu thành công!', 'success');
  };

  // Image scan flow handler
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset date to today's date for scanning
    setCurrentDate(new Date().toISOString().split('T')[0]);

    // Open scan sheet
    setIsPlusOpen(false);
    setIsScanDetailsOpen(true);
    setIsScanning(true);
    setSelectedImage(null);
    setScannedResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      executePhotoAnalysis(reader.result, file.name);
    };
    reader.readAsDataURL(file);
  };

  // Call Gemini API 100% for image analysis
  const executePhotoAnalysis = async (base64DataUri, fileName = '') => {
    setIsScanDetailsOpen(true);
    setIsScanning(true);

    // Ensure activeApiKey is valid and fallback to working DEFAULT_KEY if empty or stale
    const activeApiKey = (!apiKey || !apiKey.trim() || apiKey.includes('AQ.Ab8RN6Jjk')) ? DEFAULT_KEY : apiKey.trim();

    try {
      const mimeType = base64DataUri.split(';')[0].split(':')[1];
      const rawBase64 = base64DataUri.split(',')[1];
      
      const prompt = `Phân tích hình ảnh bữa ăn này và ước lượng lượng calo, chất béo (fat), protein, carbohydrate (carbs), và khối lượng (weightGrams) của từng món ăn trong hình. 
Hãy trả về một đối tượng JSON chính xác theo ngôn ngữ Tiếng Việt, mô tả chi tiết:
1. Tên tổng quát của đĩa/tô/bữa ăn này (dishTitle), ví dụ: "Bánh Pizza Pepperoni phô mai", "Bún thịt nướng chả giò", "Phở bò tái nạm", "Hộp sữa tươi TH True Milk 180ml", v.v.
2. Danh sách các món ăn thành phần trong hình (foodItems), mỗi món gồm: tên món (name), khối lượng ước lượng tính bằng gram (weightGrams), calo (calories), protein tính bằng gram (proteinGrams), carbs tính bằng gram (carbsGrams), fat tính bằng gram (fatGrams).
3. Tổng lượng calo (totalCalories), tổng protein (totalProteinGrams), tổng carbs (totalCarbsGrams), tổng fat (totalFatGrams).
4. Một câu tóm tắt phân tích ngắn gọn, khoảng 1-2 câu (analysisSummary), nhận xét về dinh dưỡng bữa ăn này.

Hãy ước lượng một cách hợp lý và khoa học dựa trên hình ảnh thực tế của món ăn.`;

      const requestBody = JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: rawBase64 } }
          ]
        }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              dishTitle: { type: "STRING" },
              foodItems: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    weightGrams: { type: "NUMBER" },
                    calories: { type: "NUMBER" },
                    proteinGrams: { type: "NUMBER" },
                    carbsGrams: { type: "NUMBER" },
                    fatGrams: { type: "NUMBER" }
                  },
                  required: ["name", "weightGrams", "calories", "proteinGrams", "carbsGrams", "fatGrams"]
                }
              },
              totalCalories: { type: "NUMBER" },
              totalProteinGrams: { type: "NUMBER" },
              totalCarbsGrams: { type: "NUMBER" },
              totalFatGrams: { type: "NUMBER" },
              analysisSummary: { type: "STRING" }
            },
            required: ["dishTitle", "foodItems", "totalCalories", "totalProteinGrams", "totalCarbsGrams", "totalFatGrams", "analysisSummary"]
          }
        }
      });

      // Try gemini-flash-latest (Active production Vision model)
      let response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${activeApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody
        }
      );

      // If gemini-flash-latest fails, try gemini-flash-lite-latest
      if (!response.ok) {
        response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${activeApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody
          }
        );
      }

      // If that fails, try gemini-2.0-flash
      if (!response.ok) {
        response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${activeApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestBody
          }
        );
      }

      if (!response.ok) {
        const errText = await response.text();
        let parsedErr = '';
        try {
          const errObj = JSON.parse(errText);
          parsedErr = errObj.error?.message || errText;
        } catch (e) {
          parsedErr = errText;
        }

        if (response.status === 429 || parsedErr.includes('quota') || parsedErr.includes('RESOURCE_EXHAUSTED')) {
          throw new Error(`Dự án Google AI này bị giới hạn Quota (Limit = 0). Vui lòng vào aistudio.google.com/app/apikey -> Nhấn Create API key -> Chọn 'Create API key in new project' để tạo Key mới có Free Tier miễn phí.`);
        }

        throw new Error(`Mã lỗi Gemini API ${response.status}: ${parsedErr.slice(0, 120)}`);
      }

      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(text);

      const formatted = {
        name: parsed.dishTitle || parsed.foodItems[0]?.name || "Bữa ăn quét được",
        totalCalories: Math.round(parsed.totalCalories),
        totalProteinGrams: Math.round(parsed.totalProteinGrams),
        totalCarbsGrams: Math.round(parsed.totalCarbsGrams),
        totalFatGrams: Math.round(parsed.totalFatGrams),
        analysisSummary: parsed.analysisSummary,
        foodItems: parsed.foodItems.map(item => ({
          name: item.name,
          weightGrams: Math.round(item.weightGrams),
          calories: Math.round(item.calories),
          protein: Math.round(item.proteinGrams),
          carbs: Math.round(item.carbsGrams),
          fat: Math.round(item.fatGrams)
        }))
      };

      setScannedResult(formatted);
      setIsScanning(false);
      showToast(`AI Gemini nhận diện thành công: ${formatted.name}!`, 'success');
    } catch (err) {
      console.error('API Error:', err);
      setIsScanning(false);
      setScannedResult({
        isError: true,
        errorMessage: `Lỗi gọi Gemini AI (${err.message}). Vui lòng kiểm tra lại Gemini API Key trong phần Cài đặt (⚙️).`
      });
      showToast('Lỗi kết nối Gemini AI!', 'error');
    }
  };

  // Add AI scans to active diary
  const handleSaveScanToDiary = () => {
    if (editableItems.length === 0) return;

    // Create a grouped dish item
    const groupDish = {
      id: Date.now(),
      name: scannedResult.name || "Bữa ăn nhận diện",
      calories: scanTotals.calories,
      protein: scanTotals.protein,
      carbs: scanTotals.carbs,
      fat: scanTotals.fat,
      weightGrams: editableItems.reduce((acc, curr) => acc + curr.weightGrams, 0),
      components: editableItems.map((item, idx) => ({
        id: Date.now() + 100 + idx,
        name: item.name,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
        weightGrams: item.weightGrams
      }))
    };

    const list = [...(currentLog.meals[activeMealForAdd] || [])];
    updateCurrentLog({
      meals: {
        ...currentLog.meals,
        [activeMealForAdd]: [...list, groupDish]
      }
    });

    setIsScanDetailsOpen(false);
    setSelectedImage(null);
    setScannedResult(null);
    showToast(`Đã lưu ${groupDish.name} vào Bữa ${getMealNameVi(activeMealForAdd)}!`, 'success');
  };

  // Voice Speech logging simulation
  const handleVoiceInputSubmit = async (e) => {
    e.preventDefault();
    if (!voiceText.trim()) return;

    setIsVoiceProcessing(true);
    
    if (!apiKey) {
      // Offline voice simulation parser
      setTimeout(() => {
        const text = voiceText.toLowerCase();
        let name = "Bữa ăn dinh dưỡng";
        let calories = 350;
        let protein = 15;
        let carbs = 40;
        let fat = 8;

        if (text.includes("bánh mì") || text.includes("banh mi")) {
          name = "Bánh mì trứng chả"; calories = 420; protein = 18; carbs = 45; fat = 16;
        } else if (text.includes("phở") || text.includes("pho")) {
          name = "Phở bò truyền thống"; calories = 550; protein = 24; carbs = 54; fat = 25;
        } else if (text.includes("cơm") || text.includes("com")) {
          name = "Cơm sườn trứng ốp"; calories = 680; protein = 28; carbs = 60; fat = 32;
        }

        const newItem = {
          id: Date.now(),
          name, calories, protein, carbs, fat, weightGrams: 150
        };

        const list = [...(currentLog.meals[activeMealForAdd] || [])];
        updateCurrentLog({
          meals: {
            ...currentLog.meals,
            [activeMealForAdd]: [...list, newItem]
          }
        });

        setIsVoiceProcessing(false);
        setIsVoiceModalOpen(false);
        setVoiceText('');
        showToast(`Đã nhận diện giọng nói: Thêm ${name} vào Bữa ${getMealNameVi(activeMealForAdd)}`, 'success');
      }, 1500);
      return;
    }

    try {
      // Real Gemini API parser for Voice Text input!
      const prompt = `Phân tích câu nói sau mô tả bữa ăn và tách thành món ăn dinh dưỡng cụ thể: "${voiceText}".
Hãy tính toán và trả về đối tượng JSON gồm:
{
  "name": "Tên món ăn chính ngắn gọn",
  "calories": calo ước lượng,
  "protein": đạm g,
  "carbs": tinh bột g,
  "fat": béo g,
  "weightGrams": khối lượng g
}
Trả về đúng định dạng JSON chuẩn tiếng Việt.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        }
      );

      if (!response.ok) throw new Error('API Key invalid');

      const data = await response.json();
      const rawText = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(rawText);

      const newItem = {
        id: Date.now(),
        name: parsed.name || "Món ăn nhận diện",
        calories: Number(parsed.calories) || 300,
        protein: Number(parsed.protein) || 12,
        carbs: Number(parsed.carbs) || 35,
        fat: Number(parsed.fat) || 8,
        weightGrams: Number(parsed.weightGrams) || 100
      };

      const list = [...(currentLog.meals[activeMealForAdd] || [])];
      updateCurrentLog({
        meals: {
          ...currentLog.meals,
          [activeMealForAdd]: [...list, newItem]
        }
      });

      setIsVoiceProcessing(false);
      setIsVoiceModalOpen(false);
      setVoiceText('');
      showToast(`Đã ghi: Thêm ${newItem.name} (${newItem.calories} kcal)`, 'success');
    } catch (err) {
      console.error(err);
      setIsVoiceProcessing(false);
      setIsVoiceModalOpen(false);
      showToast('Lỗi nhận diện giọng nói bằng AI. Hãy nhập lại.', 'error');
    }
  };

  // Barcode mock scan flow
  const triggerBarcodeScan = () => {
    setIsBarcodeModalOpen(true);
    setTimeout(() => {
      setIsBarcodeModalOpen(false);
      setIsPlusOpen(false);
      // Log mock milk
      const milk = {
        id: Date.now(),
        name: "Sữa chua uống Probi 65ml",
        calories: 60, protein: 1, carbs: 14, fat: 0, weightGrams: 65
      };
      const list = [...(currentLog.meals.snack || [])];
      updateCurrentLog({
        meals: {
          ...currentLog.meals,
          snack: [...list, milk]
        }
      });
      showToast('Quét mã vạch thành công: Sữa chua Probi (+60 kcal)', 'success');
    }, 2000);
  };

  const getMealNameVi = (meal) => {
    switch(meal) {
      case 'breakfast': return 'Sáng';
      case 'lunch': return 'Trưa';
      case 'dinner': return 'Tối';
      case 'snack': return 'Phụ';
      default: return meal;
    }
  };

  // Progress calculations for ring and bars
  const progressRatio = Math.min(consumed.calories / profile.calTarget, 1);
  const ringCirc = 2 * Math.PI * 70;
  const strokeOffset = ringCirc - (progressRatio * ringCirc);

  // Generate weekday headers lists for calendar (Monday to Sunday of the current week)
  const getDaysArray = () => {
    const days = [];
    const weekdaysVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const today = new Date();
    
    // Find the Monday of the current week
    const currentDay = today.getDay();
    const shift = currentDay === 0 ? 6 : currentDay - 1;
    
    const monday = new Date(today);
    monday.setDate(today.getDate() - shift);

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        dateStr,
        dayNum: d.getDate(),
        dayName: weekdaysVi[d.getDay()],
        isToday: dateStr === today.toISOString().split('T')[0]
      });
    }
    return days;
  };

  // Last 7 days calories logs for graph
  const get7DaysCalories = () => {
    return getDaysArray().map(day => {
      const log = dateLogs[day.dateStr] || { meals: {} };
      let cal = 0;
      Object.values(log.meals || {}).forEach(mealArray => {
        mealArray.forEach(item => { cal += item.calories; });
      });
      return { label: day.dayName, calories: cal };
    });
  };

  // Generate date ranges for last 4 weeks dynamically
  const getMonthWeeks = (dateStr) => {
    const dObj = new Date(dateStr);
    const y = dObj.getFullYear();
    const m = dObj.getMonth(); // 0-11
    
    // Get last day of the month
    const lastDay = new Date(y, m + 1, 0).getDate();
    const mmStr = (m + 1).toString().padStart(2, '0');

    return [
      {
        index: 0,
        label: `Tuần 1 (01/${mmStr} - 07/${mmStr})`,
        startDate: new Date(y, m, 1),
        endDate: new Date(y, m, 7)
      },
      {
        index: 1,
        label: `Tuần 2 (08/${mmStr} - 14/${mmStr})`,
        startDate: new Date(y, m, 8),
        endDate: new Date(y, m, 14)
      },
      {
        index: 2,
        label: `Tuần 3 (15/${mmStr} - 21/${mmStr})`,
        startDate: new Date(y, m, 15),
        endDate: new Date(y, m, 21)
      },
      {
        index: 3,
        label: `Tuần 4 (22/${mmStr} - ${lastDay}/${mmStr})`,
        startDate: new Date(y, m, 22),
        endDate: new Date(y, m, lastDay)
      }
    ];
  };

  const getActiveWeekIndex = (dateStr) => {
    const day = new Date(dateStr).getDate();
    if (day <= 7) return 0;
    if (day <= 14) return 1;
    if (day <= 21) return 2;
    return 3;
  };

  const getDaysForWeek = (weekObj) => {
    if (!weekObj) return [];
    const days = [];
    const weekdaysVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    
    const start = weekObj.startDate;
    const end = weekObj.endDate;
    
    // Loop from start to end date
    const current = new Date(start);
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      const dayName = weekdaysVi[current.getDay()];
      
      // Calculate calories for this date
      const log = dateLogs[dateStr] || { meals: {} };
      let cal = 0;
      Object.values(log.meals || {}).forEach(mealArray => {
        mealArray.forEach(item => { cal += Number(item.calories) || 0; });
      });

      days.push({
        dateStr,
        label: `${dayName}\u00A0${current.getDate().toString().padStart(2, '0')}`,
        calories: cal
      });
      
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const getDaysArrayForMonday = (monday) => {
    const days = [];
    const weekdaysVi = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const todayStr = new Date().toISOString().split('T')[0];

    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        dateStr,
        dayNum: d.getDate(),
        dayName: weekdaysVi[d.getDay()],
        isToday: dateStr === todayStr
      });
    }
    return days;
  };

  const get7DaysCaloriesForMonday = (monday) => {
    return getDaysArrayForMonday(monday).map(day => {
      const log = dateLogs[day.dateStr] || { meals: {} };
      let cal = 0;
      Object.values(log.meals || {}).forEach(mealArray => {
        mealArray.forEach(item => {
          cal += Number(item.calories) || 0;
        });
      });
      return { label: day.dayName, calories: cal };
    });
  };

  const weeklyHistory = get7DaysCalories();

  return (
    <div className="app-container">
      {/* Floating alert banners */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <AlertCircle size={18} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="app-header">
        <h1 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: 'white', letterSpacing: '-0.5px' }}>
          LâmBe Calorie
        </h1>
        <div className="header-meta-right">
          <button className="calendar-icon-btn" onClick={() => setIsCalculatorOpen(true)}>
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* HORIZONTAL DATE PICKER WEEKDAYS LIST */}
      <div className="day-picker">
        {getDaysArray().map((day) => (
          <div 
            key={day.dateStr} 
            className={`day-item ${currentDate === day.dateStr ? 'active' : ''}`}
            onClick={() => handleDateChange(day.dateStr)}
          >
            <span className="day-name">{day.dayName}</span>
          </div>
        ))}
      </div>

      {/* MAIN VIEW CONTROLLER SYSTEM */}
      <div className="wao-tab-content-area">

        {/* 1. DASHBOARD TAB VIEW */}
      {activeTab === 'home' && (
        <>
          {/* Section titles */}
          <div className="wao-section-title-row">
            <div className="wao-title-left">
              <span className="wao-title-date-sub">
                HÔM NAY, {new Date(currentDate).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }).replace('/', ' THG ')}
              </span>
              <h2 className="wao-title-text">Mục tiêu calo</h2>
            </div>
            <button className="wao-report-btn" onClick={() => {
              const todayStr = new Date().toISOString().split('T')[0];
              setCurrentDate(todayStr);
              setSelectedReportWeekIndex(getActiveWeekIndex(todayStr));
              setIsReportOpen(true);
            }}>
              Xem báo cáo
            </button>
          </div>

          {/* Central remaining calorie ring display */}
          <div className="wao-ring-section">
            <div className="wao-ring-wrapper">
              <svg className="wao-ring-svg" width="170" height="170">
                <circle className="wao-ring-bg" cx="85" cy="85" r="70" />
                <circle 
                  className="wao-ring-progress" 
                  cx="85" 
                  cy="85" 
                  r="70" 
                  strokeDasharray={ringCirc}
                  strokeDashoffset={strokeOffset}
                />
              </svg>
              <div className="wao-ring-center-content">
                <span className="wao-ring-value">
                  {calRemaining >= 0 ? calRemaining : 0}
                </span>
                <span className="wao-ring-lbl">Calo còn lại</span>
              </div>
            </div>
          </div>

          {/* Calorie breakdown indicators: Goal vs Consumed vs Exercise */}
          <div className="wao-stats-row">
            <div className="wao-stat-col">
              <span className="wao-stat-num">{profile.calTarget}</span>
              <span className="wao-stat-lbl">🏳️ Mục tiêu</span>
            </div>
            <div className="wao-stat-col" onClick={() => setIsConsumedDetailOpen(true)} style={{ cursor: 'pointer', userSelect: 'none' }}>
              <span className="wao-stat-num">{consumed.calories}</span>
              <span className="wao-stat-lbl">🍽️ Đã nạp</span>
            </div>
            <div className="wao-stat-col" onClick={() => setIsExerciseDetailOpen(true)} style={{ cursor: 'pointer', userSelect: 'none' }}>
              <span className="wao-stat-num">{currentLog.exercise}</span>
              <span className="wao-stat-lbl">🔥 Tiêu hao</span>
            </div>
          </div>

          {/* Daily Deficit Indicator Badge */}
          {(() => {
            const dailyExpenditure = currentLog.exercise;
            const dailyIntake = consumed.calories;
            const dailyDeficit = dailyExpenditure - dailyIntake;
            const isDeficit = dailyDeficit >= 0;

            return (
              <div style={{
                margin: '12px 0 14px 0',
                padding: '12px 16px',
                borderRadius: '14px',
                backgroundColor: isDeficit ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255, 77, 77, 0.1)',
                border: `1px solid ${isDeficit ? 'rgba(74, 222, 128, 0.25)' : 'rgba(255, 77, 77, 0.25)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px' }}>{isDeficit ? '🔥' : '📈'}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>
                    {isDeficit ? 'Thâm hụt Calo hôm nay:' : 'Thặng dư Calo hôm nay:'}
                  </span>
                </div>
                <strong style={{ fontSize: '15px', fontWeight: '800', color: isDeficit ? '#4ade80' : '#ff4d4d' }}>
                  {isDeficit ? `+${dailyDeficit} kcal` : `${Math.abs(dailyDeficit)} kcal`}
                </strong>
              </div>
            );
          })()}

          {/* Macros slider metrics box */}
          <div className="wao-card">
            <div className="wao-macros-row">
              {/* Protein box */}
              <div className="wao-macro-box">
                <span className="wao-macro-header protein">⚡ Chất đạm</span>
                <div className="wao-macro-slider">
                  <div 
                    className="wao-macro-slider-fill protein" 
                    style={{ width: `${Math.min((consumed.protein / profile.proteinTarget) * 100, 100)}%` }}
                  />
                </div>
                <span className="wao-macro-nums">
                  <strong>{consumed.protein}</strong>/{profile.proteinTarget}g
                </span>
              </div>

              {/* Carbohydrates box */}
              <div className="wao-macro-box">
                <span className="wao-macro-header carbs">🌾 Đường bột</span>
                <div className="wao-macro-slider">
                  <div 
                    className="wao-macro-slider-fill carbs" 
                    style={{ width: `${Math.min((consumed.carbs / profile.carbsTarget) * 100, 100)}%` }}
                  />
                </div>
                <span className="wao-macro-nums">
                  <strong>{consumed.carbs}</strong>/{profile.carbsTarget}g
                </span>
              </div>

              {/* Fats box */}
              <div className="wao-macro-box">
                <span className="wao-macro-header fat">💧 Chất béo</span>
                <div className="wao-macro-slider">
                  <div 
                    className="wao-macro-slider-fill fat" 
                    style={{ width: `${Math.min((consumed.fat / profile.fatTarget) * 100, 100)}%` }}
                  />
                </div>
                <span className="wao-macro-nums">
                  <strong>{consumed.fat}</strong>/{profile.fatTarget}g
                </span>
              </div>
            </div>
          </div>



          {/* BMI & Goal Summary Card */}
          <div 
            className="wao-card" 
            onClick={() => setIsCalculatorOpen(true)}
            style={{ 
              margin: '15px 20px', 
              padding: '16px', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              border: '1px solid rgba(158, 128, 249, 0.15)',
              background: 'linear-gradient(135deg, rgba(29, 27, 46, 0.6) 0%, rgba(37, 34, 62, 0.6) 100%)'
            }}
          >
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Thể trạng & Chỉ số BMI
              </span>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'white', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>{profile.bmi}</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', backgroundColor: 'rgba(158, 128, 249, 0.15)', padding: '2px 8px', borderRadius: '8px' }}>
                  {profile.bmiClass}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Mục tiêu calo</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginTop: '4px', display: 'inline-block' }}>
                {profile.goal === 'lose' ? '📉 Giảm mỡ' : profile.goal === 'gain' ? '📈 Tăng cơ' : '⚖️ Giữ dáng'}
              </span>
            </div>
          </div>

          {/* 2 main quick shortcut action buttons row */}
          <div className="wao-actions-row">
            {/* 1. Log food manually */}
            <div className="wao-action-btn-wrapper">
              <button className="wao-action-btn yellow" onClick={() => {
                setActiveMealForAdd('breakfast');
                setIsAddFoodOpen(true);
              }}>
                <Search />
              </button>
              <span className="wao-action-lbl">Ghi lại bữa ăn</span>
            </div>

            {/* 2. AI Camera scanner */}
            <div className="wao-action-btn-wrapper">
              <button 
                type="button" 
                className="wao-action-btn green" 
                onClick={() => {
                  setIsPlusOpen(false);
                  startLiveCamera();
                }}
              >
                <Sparkles />
              </button>
              <span className="wao-action-lbl">Nhận diện món ăn</span>
            </div>
          </div>
        </>
      )}

      {/* 2. DIARY TAB VIEW */}
      {activeTab === 'diary' && (
        <div style={{ padding: '0 20px' }}>
          <h2 className="wao-title-text" style={{ margin: '15px 0 10px' }}>Nhật ký ăn uống</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '15px' }}>
            Chi tiết các món ăn đã nạp trong ngày hôm nay.
          </p>

          {['breakfast', 'lunch', 'dinner', 'snack'].map((mealKey) => {
            const loggedFoods = currentLog.meals[mealKey] || [];
            const mealCals = loggedFoods.reduce((acc, curr) => acc + curr.calories, 0);

            return (
              <div className="wao-card" style={{ margin: '12px 0', padding: '16px' }} key={mealKey}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '8px' }}>
                  <strong style={{ fontSize: '15px', color: 'white' }}>Bữa {getMealNameVi(mealKey)}</strong>
                  <span style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '700' }}>{mealCals} kcal</span>
                </div>

                {loggedFoods.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {loggedFoods.map(item => (
                      <div key={item.id} style={{ display: 'flex', flexDirection: 'column', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>{item.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                              {item.weightGrams}g{item.components ? ` • ${item.components.length} thành phần` : ''}
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontWeight: '700', fontSize: '13px', color: 'var(--primary)' }}>{item.calories} kcal</span>
                            <button className="icon-btn" onClick={() => handleDeleteFood(mealKey, item.id)} style={{ width: '28px', height: '28px' }}>
                              <Trash2 size={13} color="red" />
                            </button>
                          </div>
                        </div>
                        {item.components && (
                          <div style={{ paddingLeft: '14px', borderLeft: '2px dashed rgba(158, 128, 249, 0.3)', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {item.components.map(comp => (
                              <div key={comp.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)' }}>
                                <span>• {comp.name} ({comp.weightGrams}g)</span>
                                <span style={{ fontWeight: '600' }}>{comp.calories} kcal</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', padding: '6px 0' }}>Chưa nạp năng lượng cho bữa này.</div>
                )}
              </div>
            );
          })}

          {/* Logged exercises list section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800' }}>Danh sách luyện tập</h3>
            <span style={{ fontSize: '13px', color: 'red', fontWeight: '700' }}>-{currentLog.exercise} kcal</span>
          </div>

          <div className="wao-card" style={{ margin: '10px 0', padding: '16px' }}>
            {currentLog.exercises && currentLog.exercises.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentLog.exercises.map(ex => (
                  <div key={ex.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '13px' }}>{ex.name}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'red', fontSize: '13px', fontWeight: '700' }}>-{ex.calories} kcal</span>
                      <button className="icon-btn" onClick={() => handleDeleteExercise(ex.id)} style={{ width: '28px', height: '28px' }}>
                        <Trash2 size={13} color="red" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Chưa ghi nhận hoạt động tập luyện nào.</div>
            )}
          </div>
        </div>
      )}

      {/* 3. RECIPES & PLANNING TAB VIEW */}
      {activeTab === 'recipes' && (
        <div style={{ padding: '0 20px' }}>
          <h2 className="wao-title-text" style={{ margin: '15px 0 10px' }}>Ý tưởng bữa ăn lành mạnh</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '15px' }}>
            Các thực đơn mẫu gợi ý với hàm lượng dinh dưỡng cân đối.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {HEALTHY_RECIPES.map(recipe => (
              <div className="wao-card" style={{ margin: 0, padding: '16px' }} key={recipe.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}>{recipe.name}</h3>
                  <span style={{ background: 'rgba(158, 128, 249, 0.15)', color: 'var(--primary)', fontSize: '11px', padding: '2px 8px', borderRadius: '8px', fontWeight: 'bold' }}>
                    {recipe.calories} kcal
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  <strong>Thành phần:</strong> {recipe.ingredients}
                </p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '10px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  <span>Đạm: {recipe.protein}g</span>
                  <span>Carbs: {recipe.carbs}g</span>
                  <span>Béo: {recipe.fat}g</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. SETTINGS & PROFILE TAB VIEW */}
      {activeTab === 'settings' && (
        <div style={{ padding: '0 20px' }}>
          <h2 className="wao-title-text" style={{ margin: '15px 0 10px' }}>Tài khoản cá nhân</h2>
          
          {/* User parameters stats */}
          <div className="wao-card" style={{ margin: '10px 0' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '14px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '6px' }}>
              Thông số thể trạng
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Giới tính</span>
                <strong>{profile.gender === 'male' ? 'Nam' : 'Nữ'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tuổi tác</span>
                <strong>{profile.age} tuổi</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Chiều cao</span>
                <strong>{profile.height} cm</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Cân nặng</span>
                <strong>{profile.weight} kg</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Chỉ số BMI</span>
                <strong style={{ color: 'var(--primary)' }}>{profile.bmi} ({profile.bmiClass})</strong>
              </div>
              <button className="secondary-btn" onClick={() => setIsCalculatorOpen(true)} style={{ marginTop: '8px', padding: '10px', fontSize: '12px' }}>
                Thay đổi chỉ số cơ thể
              </button>
            </div>
          </div>

          {/* Weekly tracking history chart */}
          <div className="wao-card" style={{ margin: '15px 0' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '10px' }}>Năng lượng nạp 7 ngày qua</h3>
            <div className="history-bars">
              {weeklyHistory.map((day, idx) => {
                const pct = Math.min((day.calories / Math.max(profile.calTarget, 2000)) * 100, 100);
                return (
                  <div className="history-bar-col" key={idx}>
                    <div className="history-bar-track">
                      <div className="history-bar-fill" style={{ height: `${pct}%`, backgroundColor: day.calories > profile.calTarget ? 'var(--btn-red)' : 'var(--primary)' }} />
                    </div>
                    <span className="history-bar-label">{day.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* API Key management */}
          <div className="wao-card" style={{ margin: '15px 0' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '8px' }}>Nhập API Key quét ảnh</h3>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Hãy cung cấp Gemini API Key để tính toán calo bằng trí tuệ nhân tạo.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="password"
                className="form-input"
                placeholder="Nhập Gemini API Key..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{ flex: 1, padding: '10px' }}
              />
              <button 
                className="primary-btn" 
                onClick={() => {
                  localStorage.setItem('wao_api_key', apiKey);
                  showToast('Đã lưu API Key!', 'success');
                }}
                style={{ width: 'auto', padding: '0 16px' }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* DYNAMIC IMAGE 1: DRAWER MENU OVERLAY (TAPPED CENTRAL FLOATING BUTTON) */}
      {isPlusOpen && (
        <div className="wao-overlay-menu-container" onClick={() => setIsPlusOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Sub options grid matching Image 1 */}
            <div className="wao-overlay-menu-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {/* Ghi lai hoat dong */}
              <div className="wao-overlay-card-btn" onClick={() => {
                setIsPlusOpen(false);
                setIsActivityModalOpen(true);
              }}>
                <div className="wao-overlay-card-icon" style={{ color: 'var(--btn-red)' }}>
                  <Activity size={18} />
                </div>
                <span className="wao-overlay-card-title">Ghi lại hoạt động</span>
              </div>

              {/* Can nang */}
              <div className="wao-overlay-card-btn" onClick={() => {
                setIsPlusOpen(false);
                setWeightInputVal(profile.weight);
                setIsWeightLogModalOpen(true);
              }}>
                <div className="wao-overlay-card-icon" style={{ color: 'var(--btn-yellow)' }}>
                  <Scale size={18} />
                </div>
                <span className="wao-overlay-card-title">Cân nặng</span>
              </div>
            </div>

            {/* Wide button: Chi so suc khoe */}
            <div className="wao-overlay-wide-btn" onClick={() => {
              setIsPlusOpen(false);
              setIsCalculatorOpen(true);
            }}>
              <div className="wao-overlay-wide-left">
                <span className="wao-badge-new">Mới</span>
                <span style={{ fontSize: '13px', fontWeight: '700' }}>🏃 Chỉ số sức khoẻ</span>
              </div>
              <ChevronRight size={16} color="var(--text-secondary)" />
            </div>
          </div>
        </div>
      )}

      {/* BOTTOM TAB BAR */}
      <div className="wao-tab-bar" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {/* Trang chu */}
        <button 
          className={`wao-tab-btn ${activeTab === 'home' && !isPlusOpen ? 'active' : ''}`}
          onClick={() => {
            setIsPlusOpen(false);
            setActiveTab('home');
          }}
          style={{ flex: 1 }}
        >
          <Home />
          <span>Trang chủ</span>
        </button>

        {/* Center Floating Plus Action button */}
        <div className="wao-center-btn-wrapper" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <button 
            className={`wao-floating-plus ${isPlusOpen ? 'open' : ''}`}
            onClick={() => setIsPlusOpen(!isPlusOpen)}
          >
            {isPlusOpen ? <X size={26} /> : <Plus size={26} />}
          </button>
        </div>

        {/* Nhat ky */}
        <button 
          className={`wao-tab-btn ${activeTab === 'diary' && !isPlusOpen ? 'active' : ''}`}
          onClick={() => {
            setIsPlusOpen(false);
            setActiveTab('diary');
          }}
          style={{ flex: 1 }}
        >
          <Utensils />
          <span>Nhật ký</span>
        </button>
      </div>

      {/* POPUP MODALS SHEETS */}

      {/* 1. WATER MODAL */}
      {isWaterModalOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsWaterModalOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Theo dõi uống nước</h2>
              <button className="icon-btn" onClick={() => setIsWaterModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Mục tiêu uống nước hàng ngày của bạn: <strong>{profile.waterTarget} ml</strong>. Hôm nay đã uống: <strong>{currentLog.water} ml</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              <button className="primary-btn" onClick={() => handleAddWater(250)} style={{ padding: '10px', fontSize: '13px' }}>
                +250ml
              </button>
              <button className="primary-btn" onClick={() => handleAddWater(500)} style={{ padding: '10px', fontSize: '13px' }}>
                +500ml
              </button>
              <button className="secondary-btn" onClick={() => updateCurrentLog({ water: 0 })} style={{ padding: '10px', fontSize: '13px', color: 'red' }}>
                Xóa hết
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACTIVITY EXERCISE MODAL */}
      {isActivityModalOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsActivityModalOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Ghi lại hoạt động tập luyện</h2>
              <button className="icon-btn" onClick={() => setIsActivityModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Quick Presets Grid */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Chọn nhanh hoạt động hôm nay:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {[
                  { name: '🏸 Đánh cầu lông (1 tiếng)', calories: 450 },
                  { name: '🏸 Đánh cầu lông (2 tiếng)', calories: 900 },
                  { name: '🏋️ Tập Gym / Thể hình (1 tiếng)', calories: 400 },
                  { name: '🏃 Cardio Tabata (15 phút)', calories: 80 }
                ].map((preset, idx) => (
                  <button 
                    key={idx}
                    type="button" 
                    className="secondary-btn" 
                    onClick={() => handleAddPresetExercise(preset.name, preset.calories)}
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '12px 16px', 
                      fontSize: '13px', 
                      textAlign: 'left', 
                      borderRadius: '12px',
                      backgroundColor: '#25223e',
                      border: '1px solid rgba(255,255,255,0.03)',
                      color: 'white',
                      width: '100%',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontWeight: '600' }}>{preset.name}</span>
                    <span style={{ color: 'var(--btn-red)', fontWeight: '700' }}>-{preset.calories} kcal</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', marginBottom: '10px' }} />

            {/* Manual Form */}
            <form onSubmit={handleAddExercise}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Hoặc tự nhập tên hoạt động khác:
              </h4>
              <div className="form-group">
                <label className="form-label">Tên hoạt động:</label>
                <input 
                  type="text"
                  className="form-input"
                  required
                  placeholder="Ví dụ: Bơi lội, đạp xe..."
                  value={exerciseInput.name}
                  onChange={(e) => setExerciseInput(prev => ({...prev, name: e.target.value}))}
                />
              </div>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Năng lượng tiêu hao (Calo):</label>
                <input 
                  type="number"
                  className="form-input"
                  required
                  placeholder="Ví dụ: 250"
                  value={exerciseInput.calories}
                  onChange={(e) => setExerciseInput(prev => ({...prev, calories: e.target.value}))}
                />
              </div>
              <button type="submit" className="primary-btn">Lưu hoạt động</button>
            </form>
          </div>
        </div>
      )}



      {/* 5A. WEIGHT LOG MODAL */}
      {isWeightLogModalOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsWeightLogModalOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Ghi nhận Cân nặng</h2>
              <button className="icon-btn" onClick={() => setIsWeightLogModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.4' }}>
              Nhập cân nặng hiện tại để tự động tính toán lại chỉ số BMI và lượng Calo tiêu chuẩn (BMR, TDEE) hàng ngày của bạn.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!weightInputVal || isNaN(Number(weightInputVal)) || Number(weightInputVal) <= 0) {
                showToast('Vui lòng nhập cân nặng hợp lệ!', 'warning');
                return;
              }
              const newW = Number(weightInputVal);
              const prevW = profile.weight;
              const diff = newW - prevW;
              recalculateProfileWithWeight(newW);
              setIsWeightLogModalOpen(false);
              
              if (diff < 0) {
                showToast(`Cập nhật cân nặng: ${newW.toFixed(1)} kg (Giảm ${Math.abs(diff).toFixed(1)} kg) 🎉`, 'success');
              } else if (diff > 0) {
                showToast(`Cập nhật cân nặng: ${newW.toFixed(1)} kg (Tăng +${diff.toFixed(1)} kg)`, 'success');
              } else {
                showToast(`Cập nhật cân nặng: ${newW.toFixed(1)} kg (Không đổi)`, 'info');
              }
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input 
                    type="number"
                    step="0.1"
                    className="form-input"
                    value={weightInputVal}
                    onChange={(e) => setWeightInputVal(e.target.value)}
                    style={{ fontSize: '28px', fontWeight: '800', textAlign: 'center', width: '140px', padding: '12px', borderRadius: '12px', backgroundColor: '#1d1b2e', border: '2px solid var(--primary)', color: 'white' }}
                    autoFocus
                  />
                  <span style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-secondary)' }}>kg</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Cân nặng trước đó: <strong>{profile.weight} kg</strong>
                </div>
              </div>

              <button type="submit" className="primary-btn" style={{ width: '100%', padding: '14px', borderRadius: '12px', fontWeight: '700' }}>
                Cập nhật cân nặng
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5B. CONSUMED DETAIL BOTTOM SHEET */}
      {isConsumedDetailOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsConsumedDetailOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Chi tiết đã nạp hôm nay</h2>
              <button className="icon-btn" onClick={() => setIsConsumedDetailOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '16px' }}>
              {Object.keys(currentLog.meals).map((mealKey) => {
                const label = mealKey === 'breakfast' ? '🍳 Bữa sáng' :
                              mealKey === 'lunch' ? '☀️ Bữa trưa' :
                              mealKey === 'dinner' ? '🌙 Bữa tối' : '🍎 Bữa phụ';
                const loggedFoods = currentLog.meals[mealKey] || [];
                const mealCals = loggedFoods.reduce((acc, curr) => acc + curr.calories, 0);

                return (
                  <div key={mealKey} className="wao-card" style={{ margin: 0, padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px', marginBottom: '10px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '800', color: 'white' }}>{label}</span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>{mealCals} kcal</span>
                    </div>

                    {loggedFoods.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {loggedFoods.map((item) => (
                          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{item.name}</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                đạm {item.protein || 0}g • carb {item.carbs || 0}g • béo {item.fat || 0}g
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{item.calories} kcal</span>
                              <button 
                                className="icon-btn" 
                                onClick={() => handleDeleteFood(mealKey, item.id)} 
                                style={{ width: '28px', height: '28px' }}
                              >
                                <Trash2 size={13} color="red" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        Chưa ghi nhận món ăn nào.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button className="secondary-btn" onClick={() => setIsConsumedDetailOpen(false)} style={{ width: '100%', marginTop: '10px' }}>
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* 5C. EXERCISE DETAIL BOTTOM SHEET */}
      {isExerciseDetailOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsExerciseDetailOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Chi tiết tiêu hao năng lượng</h2>
              <button className="icon-btn" onClick={() => setIsExerciseDetailOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', backgroundColor: 'rgba(255, 69, 58, 0.08)', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', color: 'white' }}>Tổng tiêu hao BMR + TDEE + Tập luyện:</span>
              <strong style={{ fontSize: '16px', color: 'red' }}>{currentLog.exercise} kcal</strong>
            </div>

            <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '16px' }}>
              {currentLog.exercises && currentLog.exercises.length > 0 ? (
                currentLog.exercises.map((ex) => (
                  <div 
                    key={ex.id} 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '12px', 
                      backgroundColor: ex.isDefault ? 'rgba(255,255,255,0.03)' : 'rgba(255, 69, 58, 0.04)', 
                      borderRadius: '10px',
                      border: ex.isDefault ? '1px dashed rgba(255,255,255,0.08)' : '1px solid rgba(255,69,58,0.1)'
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{ex.name}</span>
                      {ex.isDefault && (
                        <span style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '600' }}>
                          ⚡ Mặc định (Tự động duy trì cơ thể)
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'red', fontSize: '13px', fontWeight: '700' }}>-{ex.calories} kcal</span>
                      {!ex.isDefault && (
                        <button 
                          className="icon-btn" 
                          onClick={() => handleDeleteExercise(ex.id)} 
                          style={{ width: '28px', height: '28px' }}
                        >
                          <Trash2 size={13} color="red" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', padding: '20px 0' }}>
                  Chưa ghi nhận hoạt động nào.
                </div>
              )}
            </div>

            <button className="secondary-btn" onClick={() => setIsExerciseDetailOpen(false)} style={{ width: '100%', marginTop: '10px' }}>
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* 5. BMI / HEALTH target parameters updater sheet */}
      {isCalculatorOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsCalculatorOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Chỉ số cơ thể & Sức khỏe</h2>
              <button className="icon-btn" onClick={() => setIsCalculatorOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={processCalculations}>
              <div className="form-group">
                <label className="form-label">Giới tính:</label>
                <div className="form-toggle-grid">
                  <div 
                    className={`toggle-option ${calcInputs.gender === 'male' ? 'active' : ''}`}
                    onClick={() => setCalcInputs(prev => ({...prev, gender: 'male'}))}
                  >
                    Nam
                  </div>
                  <div 
                    className={`toggle-option ${calcInputs.gender === 'female' ? 'active' : ''}`}
                    onClick={() => setCalcInputs(prev => ({...prev, gender: 'female'}))}
                  >
                    Nữ
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tuổi:</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    required
                    value={calcInputs.age}
                    onChange={(e) => setCalcInputs(prev => ({...prev, age: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Chiều cao (cm):</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    required
                    value={calcInputs.height}
                    onChange={(e) => setCalcInputs(prev => ({...prev, height: e.target.value}))}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Cân nặng hiện tại (kg):</label>
                <input 
                  type="number" 
                  className="form-input" 
                  required
                  value={calcInputs.weight}
                  onChange={(e) => setCalcInputs(prev => ({...prev, weight: e.target.value}))}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ marginBottom: '10px' }}>Mức độ vận động hàng ngày:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { value: 'sedentary', title: 'Ít vận động', desc: 'Làm việc văn phòng, ít đi lại' },
                    { value: 'light', title: 'Vận động nhẹ', desc: 'Tập luyện nhẹ nhàng 1-3 ngày/tuần' },
                    { value: 'moderate', title: 'Vận động vừa', desc: 'Tập luyện năng động 3-5 ngày/tuần' },
                    { value: 'active', title: 'Vận động nhiều', desc: 'Tập luyện thể thao cường độ cao 6-7 ngày/tuần' }
                  ].map((opt) => {
                    const isActive = calcInputs.activityLevel === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCalcInputs(prev => ({...prev, activityLevel: opt.value}))}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: '12px 16px',
                          borderRadius: '12px',
                          border: isActive ? '1.5px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)',
                          backgroundColor: isActive ? '#25223e' : '#1d1b2e',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          width: '100%',
                          outline: 'none',
                          boxShadow: isActive ? '0 0 10px rgba(158, 128, 249, 0.15)' : 'none'
                        }}
                      >
                        <span style={{ 
                          fontSize: '13px', 
                          fontWeight: '700', 
                          color: isActive ? 'var(--primary)' : 'white',
                          marginBottom: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          {opt.title}
                          {isActive && <span style={{ fontSize: '10px', backgroundColor: 'var(--primary)', color: 'white', padding: '1px 6px', borderRadius: '10px' }}>Đang chọn</span>}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                          {opt.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Cân nặng mong muốn (kg):</label>
                <input 
                  type="number" 
                  step="0.1"
                  className="form-input" 
                  required
                  placeholder="Ví dụ: 64"
                  value={calcInputs.targetWeight ?? ''}
                  onChange={(e) => {
                    const rawVal = e.target.value;
                    const targetVal = rawVal === '' ? '' : Number(rawVal);
                    const currentW = Number(calcInputs.weight) || 0;
                    let detectedGoal = 'maintain';
                    if (targetVal !== '' && targetVal < currentW) {
                      detectedGoal = 'lose';
                    } else if (targetVal !== '' && targetVal > currentW) {
                      detectedGoal = 'gain';
                    }
                    setCalcInputs(prev => ({
                      ...prev, 
                      targetWeight: targetVal,
                      goal: detectedGoal
                    }));
                  }}
                />
                {calcInputs.targetWeight !== '' && calcInputs.targetWeight !== undefined && !isNaN(calcInputs.targetWeight) && (
                  <div style={{ 
                    fontSize: '12px', 
                    marginTop: '8px', 
                    padding: '10px 14px', 
                    borderRadius: '10px', 
                    backgroundColor: 'rgba(158, 128, 249, 0.12)', 
                    border: '1px solid rgba(158, 128, 249, 0.2)',
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                  }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>Hệ thống tự nhận diện:</span>
                    <strong style={{ color: 'var(--primary)', fontWeight: '700' }}>
                      {Number(calcInputs.targetWeight) < Number(calcInputs.weight)
                        ? `📉 Giảm mỡ (Giảm ${(Number(calcInputs.weight) - Number(calcInputs.targetWeight)).toFixed(1)} kg)`
                        : Number(calcInputs.targetWeight) > Number(calcInputs.weight)
                        ? `📈 Tăng cơ (Tăng ${(Number(calcInputs.targetWeight) - Number(calcInputs.weight)).toFixed(1)} kg)`
                        : '⚖️ Giữ dáng'}
                    </strong>
                  </div>
                )}
              </div>

              <button type="submit" className="primary-btn">Cập nhật chỉ số</button>
            </form>

            {/* BACKUP & RESTORE DATA SECTION */}
            <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginBottom: '6px' }}>
                📦 Sao lưu & Khôi phục dữ liệu:
              </h4>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.4' }}>
                Xuất dữ liệu thành tệp <strong>.json</strong> để sao lưu hoặc chuyển đổi dữ liệu sang bất kỳ iPhone / iPad / Máy tính nào khác.
              </p>
              
              <input 
                ref={backupInputRef}
                type="file" 
                accept=".json" 
                onChange={handleImportBackup}
                style={{ display: 'none' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '12px 8px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(158, 128, 249, 0.15)',
                    border: '1px solid rgba(158, 128, 249, 0.3)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  📥 Sao lưu (.json)
                </button>

                <button
                  type="button"
                  onClick={() => backupInputRef.current && backupInputRef.current.click()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '12px 8px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  📤 Khôi phục tệp
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PHOTO SOURCE OPTION MODAL SHEET */}
      {isPhotoSourceModalOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsPhotoSourceModalOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Nhận diện món ăn AI</h2>
              <button className="icon-btn" onClick={() => setIsPhotoSourceModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Chọn phương thức tải ảnh món ăn để Gemini AI phân tích dinh dưỡng:
            </p>

            {/* Hidden Inputs */}
            <input 
              ref={cameraInputRef}
              type="file" 
              accept="image/*" 
              capture="environment" 
              onChange={(e) => {
                setIsPhotoSourceModalOpen(false);
                handleImageFileChange(e);
              }}
              style={{ display: 'none' }}
            />
            <input 
              ref={galleryInputRef}
              type="file" 
              accept="image/*" 
              onChange={(e) => {
                setIsPhotoSourceModalOpen(false);
                handleImageFileChange(e);
              }}
              style={{ display: 'none' }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
              <button 
                type="button" 
                className="primary-btn" 
                onClick={startLiveCamera}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  padding: '16px', 
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, var(--primary), #7c5dfa)',
                  fontWeight: '700',
                  fontSize: '15px'
                }}
              >
                📸 Chụp ảnh trực tiếp
              </button>

              <button 
                type="button" 
                className="secondary-btn" 
                onClick={() => galleryInputRef.current && galleryInputRef.current.click()}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  padding: '16px', 
                  borderRadius: '16px',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '15px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                🖼️ Chọn ảnh từ bộ sưu tập
              </button>
            </div>

            {/* QUICK LOG FAVORITES (ONE-TAP WITHOUT SCANNING) */}
            <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ⚡ Ghi nhanh món quen thuộc (Không cần chụp)
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: '600' }}>1-Chạm</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '360px', overflowY: 'auto', paddingRight: '4px' }}>
                {QUICK_FAVORITES.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setIsPhotoSourceModalOpen(false);
                      setScannedResult(item);
                      setIsScanDetailsOpen(true);
                      setIsScanning(false);
                      showToast(`Đã chọn nhanh: ${item.name}!`, 'success');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '22px' }}>{item.icon}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{item.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{item.subtitle}</span>
                      </div>
                    </div>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      color: 'var(--primary)', 
                      backgroundColor: 'rgba(158, 128, 249, 0.15)',
                      padding: '4px 10px',
                      borderRadius: '20px'
                    }}>
                      + {item.totalCalories} kcal
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LIVE CAMERA VIEWFINDER MODAL SHEET */}
      {isLiveCameraOpen && (
        <div className="bottom-sheet-backdrop" style={{ zIndex: 11000 }} onClick={stopLiveCamera}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()} style={{ padding: '20px', textAlign: 'center' }}>
            <div className="sheet-handle" />
            <div className="sheet-header" style={{ marginBottom: '15px' }}>
              <h2 className="sheet-title">📸 Chụp ảnh món ăn trực tiếp</h2>
              <button className="icon-btn" onClick={stopLiveCamera}>
                <X size={18} />
              </button>
            </div>

            <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4', maxHeight: '55vh', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#000', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video 
                ref={(el) => {
                  videoRef.current = el;
                  if (el && cameraStream && el.srcObject !== cameraStream) {
                    el.srcObject = cameraStream;
                  }
                }} 
                autoPlay 
                playsInline 
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={captureLivePhoto}
                style={{ 
                  width: '72px', 
                  height: '72px', 
                  borderRadius: '50%', 
                  border: '5px solid white', 
                  backgroundColor: 'var(--primary)',
                  boxShadow: '0 4px 20px rgba(158, 128, 249, 0.6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', border: '2px solid white', backgroundColor: 'transparent' }} />
              </button>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '12px' }}>
              Hướng ống kính về đĩa ăn và nhấn nút tròn để chụp
            </p>
          </div>
        </div>
      )}

      {/* 6. MANUAL ADD FOOD MODAL SHEET */}
      {isAddFoodOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setIsAddFoodOpen(false)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Ghi lại bữa ăn thủ công</h2>
              <button className="icon-btn" onClick={() => setIsAddFoodOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Nhập chi tiết thức ăn nạp vào <strong>Bữa {getMealNameVi(activeMealForAdd)}</strong>.
            </p>

            <form onSubmit={handleAddManualFood}>
              <div className="form-group">
                <label className="form-label">Tên món ăn (*):</label>
                <input 
                  type="text" 
                  className="form-input" 
                  required
                  placeholder="Ví dụ: Phở gà, Salad tôm,..."
                  value={manualFood.name}
                  onChange={(e) => setManualFood(prev => ({...prev, name: e.target.value}))}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Năng lượng nạp (kcal) (*):</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    required
                    placeholder="Ví dụ: 350"
                    value={manualFood.calories}
                    onChange={(e) => setManualFood(prev => ({...prev, calories: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Khối lượng ước lượng (g):</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="100"
                    value={manualFood.weight}
                    onChange={(e) => setManualFood(prev => ({...prev, weight: e.target.value}))}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
                <div className="form-group">
                  <label className="form-label">Đạm (Protein g):</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="0"
                    value={manualFood.protein}
                    onChange={(e) => setManualFood(prev => ({...prev, protein: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Carbs (Carbs g):</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="0"
                    value={manualFood.carbs}
                    onChange={(e) => setManualFood(prev => ({...prev, carbs: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Béo (Fat g):</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="0"
                    value={manualFood.fat}
                    onChange={(e) => setManualFood(prev => ({...prev, fat: e.target.value}))}
                  />
                </div>
              </div>

              <button type="submit" className="primary-btn">Lưu món ăn</button>
            </form>
          </div>
        </div>
      )}

      {/* 7. PHOTO SCAN AI RESULT OVERLAY PANEL */}
      {isScanDetailsOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => {
          if (!isScanning) setIsScanDetailsOpen(false);
        }}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-header">
              <h2 className="sheet-title">Kết quả phân tích AI</h2>
              <button className="icon-btn" disabled={isScanning} onClick={() => setIsScanDetailsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {isScanning ? (
              <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#13121f', border: '1px solid rgba(255,255,255,0.05)' }}>
                {selectedImage && <img src={selectedImage} alt="Scanning preview" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />}
                <div className="scanner-overlay">
                  <div style={{ textAlign: 'center', color: 'white' }}>
                    <div className="laser-line" />
                    <Sparkles size={24} style={{ color: 'var(--primary)', marginBottom: '8px', animation: 'spin 2s linear infinite' }} />
                    <p style={{ fontSize: '13px', fontWeight: 'bold' }}>AI đang quét ảnh bữa ăn...</p>
                  </div>
                </div>
              </div>
            ) : scannedResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedImage && (
                  <div style={{ width: '100%', maxHeight: '320px', minHeight: '180px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#0d0c15', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img 
                      src={selectedImage} 
                      alt="Scanned Food" 
                      style={{ width: '100%', maxHeight: '320px', objectFit: 'contain' }} 
                    />
                  </div>
                )}

                {scannedResult.isError ? (
                  <div style={{ padding: '16px', backgroundColor: 'rgba(255, 69, 58, 0.1)', border: '1px solid rgba(255, 69, 58, 0.3)', borderRadius: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔑</div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#ff4d4d', marginBottom: '6px' }}>
                      Cần Gemini API Key để nhận diện
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                      {scannedResult.errorMessage}
                    </p>
                    <button 
                      type="button" 
                      className="primary-btn" 
                      onClick={() => {
                        setIsScanDetailsOpen(false);
                        setActiveTab('settings');
                      }}
                      style={{ padding: '12px', fontSize: '13px' }}
                    >
                      ⚙️ Đến phần Cài đặt nhập Gemini API Key
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ textAlign: 'center' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{scannedResult.name}</h3>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Phát hiện thành công {editableItems.length} thành phần thực phẩm
                      </p>
                    </div>

                    {/* Macro metrics badge pills (Recalculated dynamically) */}
                    <div className="analyzed-macros-pill" style={{ justifyContent: 'center' }}>
                      <div className="macro-badge calories" style={{ fontSize: '15px', padding: '6px 16px' }}>
                        <Zap size={14} fill="var(--primary)" /> {scanTotals.calories} kcal
                      </div>
                    </div>

                    {/* AI advice recommendation block */}
                    {scannedResult.analysisSummary && (
                      <div style={{ padding: '12px', backgroundColor: '#25223e', borderRadius: '14px', fontSize: '12px', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: '8px' }}>
                        <Sparkles size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <p style={{ color: 'white', lineHeight: '1.4' }}>
                          <strong>Nhận xét dinh dưỡng:</strong> {scannedResult.analysisSummary}
                        </p>
                      </div>
                    )}

                    {/* Detected food item rows breakdown with weight/gram adjusters */}
                    {editableItems.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                          Điều chỉnh lượng thức ăn thực tế:
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {editableItems.map((item, idx) => (
                            <div key={idx} style={{ padding: '12px', backgroundColor: '#25223e', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.02)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <strong style={{ fontSize: '14px', color: 'white' }}>{item.name}</strong>
                                <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--primary)' }}>
                                  {item.calories} kcal
                                </span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Khối lượng:</span>
                                  <input 
                                    type="number"
                                    className="form-input"
                                    style={{ padding: '4px 8px', fontSize: '12px', width: '70px', borderRadius: '6px', textAlign: 'center', backgroundColor: '#1d1b2e', border: '1px solid rgba(255,255,255,0.08)', color: 'white' }}
                                    value={item.weightGrams}
                                    onChange={(e) => handleWeightChange(idx, e.target.value)}
                                  />
                                  <span style={{ fontSize: '12px', color: 'white', fontWeight: '600' }}>g</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Active Meal Type Log Selector */}
                    <div className="form-group">
                      <label className="form-label">Chọn bữa lưu nhật ký:</label>
                      <div className="form-toggle-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        {['breakfast', 'lunch', 'dinner', 'snack'].map((m) => (
                          <div 
                            key={m} 
                            className={`toggle-option ${activeMealForAdd === m ? 'active' : ''}`}
                            onClick={() => setActiveMealForAdd(m)}
                            style={{ fontSize: '11px', padding: '8px 2px' }}
                          >
                            {getMealNameVi(m)}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button type="button" className="primary-btn" onClick={handleSaveScanToDiary}>
                      Lưu vào Bữa {getMealNameVi(activeMealForAdd)}
                    </button>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* 8. WEEKLY REPORT OVERLAY SHEET */}
      {isReportOpen && (() => {
        const weeksList = getMonthWeeks(currentDate);
        const selectedWeek = weeksList[selectedReportWeekIndex] || weeksList[0];
        const weeklyHistoryForReport = getDaysForWeek(selectedWeek);
        const totalCals = weeklyHistoryForReport.reduce((sum, d) => sum + d.calories, 0);
        const daysWithLogs = weeklyHistoryForReport.filter(d => d.calories > 0).length;
        const averageCals = daysWithLogs > 0 ? Math.round(totalCals / daysWithLogs) : 0;

        // Calculate Weekly Total Expenditure & Deficit
        let weeklyTotalExp = 0;
        weeklyHistoryForReport.forEach(d => {
          if (d.calories > 0) {
            const log = dateLogs[d.dateStr] || {};
            const w = log.weight || profile.weight;
            const bmrExp = getDefaultExercises(w).reduce((s, e) => s + e.calories, 0);
            const extraExp = (log.exercises || []).filter(e => !e.isDefault).reduce((s, e) => s + Number(e.calories) || 0, 0);
            weeklyTotalExp += (bmrExp + extraExp);
          }
        });
        const weeklyTotalDeficit = daysWithLogs > 0 ? (weeklyTotalExp - totalCals) : 0;
        const estimatedFatLossKg = weeklyTotalDeficit > 0 ? (weeklyTotalDeficit / 7700).toFixed(2) : '0.00';

        return (
          <div className="bottom-sheet-backdrop" onClick={() => setIsReportOpen(false)}>
            <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="sheet-handle" />
              <div className="sheet-header">
                <h2 className="sheet-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={18} color="var(--primary)" /> Báo cáo dinh dưỡng
                </h2>
                <button className="icon-btn" onClick={() => setIsReportOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '20px' }}>
                {/* Week Segmented Controller */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 'bold' }}>CHỌN TUẦN THEO DÕI:</span>
                  <div style={{ 
                    display: 'flex', 
                    backgroundColor: '#13121f', 
                    borderRadius: '12px', 
                    padding: '4px',
                    border: '1px solid rgba(255,255,255,0.04)',
                    gap: '4px'
                  }}>
                    {weeksList.map((wk) => {
                      const isActive = selectedReportWeekIndex === wk.index;
                      return (
                        <button
                          key={wk.index}
                          type="button"
                          onClick={() => setSelectedReportWeekIndex(wk.index)}
                          style={{
                            flex: 1,
                            padding: '10px 6px',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                            color: isActive ? 'white' : 'var(--text-secondary)',
                            fontSize: '11px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            textAlign: 'center'
                          }}
                        >
                          {`Tuần ${wk.index + 1}`}
                        </button>
                      );
                    })}
                  </div>
                  {/* Date range subtitle */}
                  <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--primary)', fontWeight: '700', marginTop: '2px' }}>
                    Thời gian: {selectedWeek.label.split('(')[1].replace(')', '')}
                  </div>
                </div>

                {/* Report Stats Summary Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '12px', backgroundColor: '#25223e', borderRadius: '12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Tổng calo đã nạp</span>
                    <strong style={{ fontSize: '18px', color: 'white', marginTop: '4px', display: 'block' }}>
                      {totalCals} kcal
                    </strong>
                  </div>
                  <div style={{ padding: '12px', backgroundColor: '#25223e', borderRadius: '12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Trung bình ngày</span>
                    <strong style={{ fontSize: '18px', color: 'var(--primary)', marginTop: '4px', display: 'block' }}>
                      {averageCals} kcal
                    </strong>
                  </div>
                </div>

                {/* WEEKLY TOTAL DEFICIT SUMMARY CARD */}
                <div style={{ 
                  padding: '14px 16px', 
                  backgroundColor: weeklyTotalDeficit >= 0 ? 'rgba(74, 222, 128, 0.12)' : 'rgba(255, 77, 77, 0.12)', 
                  borderRadius: '14px', 
                  border: `1px solid ${weeklyTotalDeficit >= 0 ? 'rgba(74, 222, 128, 0.25)' : 'rgba(255, 77, 77, 0.25)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      🔥 TỔNG THÂM HỤT CALO NGUYÊN TUẦN
                    </span>
                    <strong style={{ fontSize: '18px', color: weeklyTotalDeficit >= 0 ? '#4ade80' : '#ff4d4d', fontWeight: '800' }}>
                      {weeklyTotalDeficit >= 0 ? `+${weeklyTotalDeficit} kcal` : `${weeklyTotalDeficit} kcal`}
                    </strong>
                  </div>

                  {weeklyTotalDeficit > 0 && (
                    <div style={{ 
                      fontSize: '11px', 
                      fontWeight: '700', 
                      color: 'white', 
                      backgroundColor: 'rgba(255,255,255,0.1)', 
                      padding: '6px 12px', 
                      borderRadius: '20px',
                      border: '1px solid rgba(255,255,255,0.15)'
                    }}>
                      📉 ~{estimatedFatLossKg} kg mỡ
                    </div>
                  )}
                </div>

                {/* Bar Chart Container */}
                <div style={{ backgroundColor: '#1d1b2e', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'white' }}>Biểu đồ Calo tuần</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Mục tiêu: {profile.calTarget} kcal</span>
                  </div>

                  {/* Bars Area */}
                  {(() => {
                    const maxScale = Math.max(...weeklyHistoryForReport.map(d => d.calories), profile.calTarget, 3000);
                    const targetBottom = (profile.calTarget / maxScale) * 110 + 10;
                    return (
                      <div style={{ position: 'relative', height: '180px', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', paddingTop: '40px', paddingBottom: '10px' }}>
                        {/* Calorie target baseline */}
                        <div style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          bottom: `${targetBottom}px`,
                          borderTop: '1.5px dashed rgba(158, 128, 249, 0.4)',
                          zIndex: 1
                        }}>
                          <span style={{ position: 'absolute', right: 0, top: '-14px', fontSize: '9px', color: 'rgba(158, 128, 249, 0.7)', fontWeight: 'bold' }}>Target</span>
                        </div>

                        {weeklyHistoryForReport.map((day, idx) => {
                          const barHeight = (day.calories / maxScale) * 110;
                          const isOverTarget = day.calories > profile.calTarget;

                          return (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: 0, zIndex: 2 }}>
                              {/* Calorie number above bar */}
                              <span style={{ fontSize: '9px', fontWeight: '700', color: isOverTarget ? 'red' : 'white', marginBottom: '4px', whiteSpace: 'nowrap' }}>
                                {day.calories > 0 ? day.calories : ''}
                              </span>

                              {/* The Bar */}
                              <div style={{
                                width: weeklyHistoryForReport.length > 7 ? '10px' : '14px',
                                height: `${Math.max(barHeight, 4)}px`,
                                borderRadius: '8px',
                                background: day.calories > 0 
                                  ? (isOverTarget ? 'linear-gradient(180deg, #ff4d4d, #cc0000)' : 'linear-gradient(180deg, var(--primary), #7c5dfa)')
                                  : 'rgba(255,255,255,0.06)',
                                transition: 'height 0.3s ease-in-out'
                              }} />

                              {/* Day Label */}
                              <span style={{ 
                                fontSize: weeklyHistoryForReport.length > 7 ? '9.5px' : '11px', 
                                color: 'var(--text-secondary)', 
                                marginTop: '8px', 
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                textAlign: 'center'
                              }}>
                                {day.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Status Advisory based on logs */}
                <div style={{ padding: '12px', backgroundColor: '#25223e', borderRadius: '12px', fontSize: '12px', lineHeight: '1.4', color: 'white' }}>
                  {(() => {
                    if (totalCals === 0) {
                      return "Bạn chưa ghi chép bữa ăn nào trong tuần này. Hãy sử dụng tính năng chụp hình AI hoặc ghi tay để theo dõi calo mỗi ngày nhé!";
                    }
                    const daysOver = weeklyHistoryForReport.filter(d => d.calories > profile.calTarget).length;
                    if (daysOver === 0) {
                      return `Tuyệt vời! Bạn đang kiểm soát calo rất tốt. 100% số ngày ghi chép đều nằm trong hạn mức thâm hụt calo đề ra. Hãy tiếp tục duy trì!`;
                    } else {
                      return `Tuần này bạn có ${daysOver} ngày vượt mức calo mục tiêu. Hãy chú ý tiết chế khẩu phần ăn và tăng cường tập luyện thể thao (đánh cầu lông, gym) để thâm hụt năng lượng tối ưu nhé!`;
                    }
                  })()}
                </div>

                <button className="primary-btn" onClick={() => setIsReportOpen(false)}>
                  Đóng báo cáo
                </button>
            </div>
          </div>
        </div>
      ); })()}
    </div>
  );
}

export default App;
