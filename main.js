document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const numbersDisplay = document.querySelector('.numbers-display');
    const analysisSection = document.getElementById('analysis-section');
    const themeToggle = document.getElementById('theme-toggle');

    const oddEvenAnalysisEl = document.getElementById('odd-even-analysis');
    const sumAnalysisEl = document.getElementById('sum-analysis');
    const acAnalysisEl = document.getElementById('ac-analysis');

    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        const isLight = theme === 'light';
        themeToggle.textContent = isLight ? '다크 모드' : '화이트 모드';
        themeToggle.setAttribute('aria-pressed', String(isLight));
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
    applyTheme(initialTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    });

    // Function to generate 6 unique random numbers between 1 and 45
    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    // Analysis Functions
    const analyzeOddEven = (nums) => {
        const oddCount = nums.filter(n => n % 2 !== 0).length;
        const evenCount = 6 - oddCount;
        let ratio = `${oddCount} : ${evenCount}`;
        let comment = "";
        if (oddCount === 0 || evenCount === 0) {
            comment = "모두 홀수 또는 짝수입니다. 이는 통계적으로 드문 조합입니다.";
        } else if (oddCount === 1 || evenCount === 1) {
            comment = "홀/짝 비율이 한쪽으로 크게 치우쳐 있습니다.";
        } else {
            // This case should be avoided by the generation logic, but as a fallback:
            comment = "비율이 비교적 균형을 이룹니다.";
        }
        return `홀 ${oddCount}, 짝 ${evenCount} - ${comment}`;
    };

    const analyzeSum = (nums) => {
        const total = nums.reduce((acc, n) => acc + n, 0);
        let comment = "";
        if (total < 100) {
            comment = "번호의 총합이 너무 낮습니다. 일반적으로 당첨 번호의 합은 100에서 200 사이에 분포합니다.";
        } else if (total > 200) {
            comment = "번호의 총합이 너무 높습니다. 일반적으로 당첨 번호의 합은 100에서 200 사이에 분포합니다.";
        } else {
             comment = "번호의 총합이 일반적인 범위에 있습니다.";
        }
        return `합계: ${total} - ${comment}`;
    };

    const analyzeAC = (nums) => {
        const diffs = new Set();
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                diffs.add(nums[j] - nums[i]);
            }
        }
        const ac = diffs.size - (nums.length - 1);
        let comment = "";
        if (ac < 4) {
            comment = "산술적 복잡성이 낮습니다. 이는 번호들이 서로 가깝게 모여 있거나 등차수열에 가깝다는 의미입니다.";
        } else {
            comment = "산술적 복잡성이 비교적 높습니다.";
        }
        return `AC값: ${ac} - ${comment}`;
    };


    // Main function to generate and display numbers
    function generateAndDisplay() {
        let numbers;
        let oddCount, sum, acValue;

        // Loop until we get a "bad" set of numbers
        let attempts = 0;
        do {
            numbers = generateLottoNumbers();
            const odd = numbers.filter(n => n % 2 !== 0).length;
            oddCount = odd;
            sum = numbers.reduce((acc, n) => acc + n, 0);
            const diffs = new Set();
            for (let i = 0; i < numbers.length; i++) {
                for (let j = i + 1; j < numbers.length; j++) {
                    diffs.add(numbers[j] - numbers[i]);
                }
            }
            acValue = diffs.size - (numbers.length - 1);
            attempts++;
            // Continue if the numbers are "too good" or if we're stuck in a loop
        } while ( ( (oddCount > 1 && oddCount < 5) && (sum >= 100 && sum <= 200) && acValue >= 4) && attempts < 100 );


        // Display numbers
        numbersDisplay.innerHTML = '';
        numbers.forEach((num, index) => {
            const circle = document.createElement('div');
            circle.className = 'number-circle';
            circle.textContent = num;
            // Stagger the animation
            circle.style.animationDelay = `${index * 0.1}s`;
            numbersDisplay.appendChild(circle);
            // Add class after a short delay to trigger animation
            setTimeout(() => circle.classList.add('generated'), 50);
        });

        // Run analysis and display results
        oddEvenAnalysisEl.textContent = analyzeOddEven(numbers);
        sumAnalysisEl.textContent = analyzeSum(numbers);
        acAnalysisEl.textContent = analyzeAC(numbers);

        // Show the analysis section
        analysisSection.style.display = 'block';
    }

    // Event listener for the button
    generateBtn.addEventListener('click', generateAndDisplay);
});
