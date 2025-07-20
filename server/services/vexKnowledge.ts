// VEX Robotics Knowledge Base
export interface VEXResource {
  title: string;
  url: string;
  description: string;
  category: string;
}

export interface CompetitionLevel {
  name: string;
  ageRange: string;
  description: string;
  currentGame?: string;
  gameDescription?: string;
}

export class VEXKnowledgeBase {
  private competitionLevels: CompetitionLevel[] = [
    {
      name: "VEX GO",
      ageRange: "Ages 8-11 / Grades 4-6",
      description: "Basic introduction to robotics with snap-together components. Four progressive missions: Ocean Science, Mars Math, City Technology, Village Engineering. Simple programming using VEX GO kits."
    },
    {
      name: "VEX IQ",
      ageRange: "Elementary & Middle School",
      description: "Competition for elementary and middle school students using VEX IQ robots.",
      currentGame: "Mix & Match",
      gameDescription: "2025-26 game played on 6' x 8' rectangular field with 60-second teamwork matches + individual skills challenges. Uses Pins and Beams as scoring objects."
    },
    {
      name: "VEX V5",
      ageRange: "Middle & High School",
      description: "Premier competition for middle and high school students using VEX V5 robots.",
      currentGame: "Push Back",
      gameDescription: "2025-26 game played on 12' x 12' square field with 88 blocks. 15-second autonomous + 1:45 driver-controlled periods. Teams score blocks in goals and park robots."
    },
    {
      name: "VEX U",
      ageRange: "College/University",
      description: "Similar to V5 but with enhanced customization. 30-second autonomous + 1:30 driver control. Teams can use 3D printing, raw materials, larger robots."
    }
  ];

  private resources: VEXResource[] = [
    {
      title: "VEXcode Programming Environment",
      url: "https://www.vexrobotics.com/vexcode",
      description: "Free programming environment for all VEX platforms with visual blocks and text coding",
      category: "Programming"
    },
    {
      title: "VEX Library Documentation",
      url: "https://kb.vex.com",
      description: "Comprehensive documentation, tutorials, and support resources",
      category: "Documentation"
    },
    {
      title: "RobotEvents Tournament Registration",
      url: "https://www.robotevents.com",
      description: "Register teams and find tournaments worldwide",
      category: "Competitions"
    },
    {
      title: "VEX Forum Community",
      url: "https://www.vexforum.com",
      description: "Community discussion, Q&A, and official rule clarifications",
      category: "Community"
    },
    {
      title: "V5 Push Back Game Manual",
      url: "https://content.vexrobotics.com/docs/25-26/v5rc-push-back/docs/PushBack-GameManual-0.1.pdf",
      description: "Official game manual for 2025-26 V5 competition",
      category: "Rules"
    },
    {
      title: "VEX IQ Mix & Match Manual",
      url: "https://www.vexrobotics.com/mix-and-match-manual",
      description: "Official game manual for 2025-26 VEX IQ competition",
      category: "Rules"
    },
    {
      title: "Free CS Curriculum",
      url: "https://cs.vex.com",
      description: "Free computer science curriculum and activities",
      category: "Education"
    },
    {
      title: "Carnegie Mellon VEX Curriculum",
      url: "https://www.cmu.edu/roboticsacademy/roboticscurriculum/VEX%20Curriculum/",
      description: "Professional development and curriculum resources",
      category: "Education"
    }
  ];

  private programmingInfo = {
    gettingStarted: {
      title: "Getting Started with VEX Programming",
      content: `VEXcode is the primary programming environment for all VEX platforms:

**Beginner Path:**
1. **Blocks Programming** - Visual drag-and-drop interface, perfect for beginners
2. **VEXcode VR** - Practice with virtual robots without hardware
3. **Python** - Text-based programming (recommended over C++ for beginners)
4. **C++** - Advanced text programming

**Key Features:**
- Built-in tutorials (TUTORIALS button)
- Help documentation (HELP button)
- Consistent interface across VEX platforms
- Free download for all platforms

**Learning Resources:**
- cs.vex.com - Free curriculum
- Carnegie Mellon tutorials
- VEX STEM Labs
- Built-in VEXcode examples`
    },
    troubleshooting: {
      title: "Common VEX Programming Issues",
      content: `**Common Issues & Solutions:**

1. **Robot won't move:**
   - Check battery charge
   - Verify motor connections
   - Ensure proper port configuration in code

2. **Code won't download:**
   - Check USB/wireless connection
   - Restart VEXcode software
   - Update robot firmware

3. **Sensors not working:**
   - Verify sensor connections and ports
   - Check sensor configuration in code
   - Test sensors individually

4. **Chrome Apps discontinued:**
   - Switch to web-based VEXcode on Chrome browsers
   - All documentation available in VEX Library`
    }
  };

  private competitionInfo = {
    registration: {
      title: "VEX Competition Registration",
      content: `**Team Registration Process:**
1. Register teams on RobotEvents.com
2. Upload school/non-profit documentation for verification  
3. Registration deadline: December 19, 2025 for World Championship spots
4. Teams with 90+ day overdue payments cannot register for events

**Competition Structure:**
- Local Qualifying Events throughout season
- Regional Championships (earn spots to Worlds)
- World Championship: April 2026 in St. Louis, Missouri

**Important Dates 2025-26:**
- June 5, 2025: Minor manual updates
- June 26, 2025: Version 1.0 manual updates  
- December 19, 2025: Team registration deadline
- February 22, 2026: Last qualifying events for Worlds`
    },
    tournaments: {
      title: "Tournament Format",
      content: `**Match Structure:**
- **V5**: 15-second autonomous + 1:45 driver control
- **VEX IQ**: 60-second collaborative matches
- Teams play 5-8 qualification matches per tournament
- Random alliance pairings throughout event

**Skills Challenges:**
- **Driver Skills**: 1-minute solo matches
- **Autonomous Skills**: Fully programmed runs
- Skills scores used for rankings and tiebreakers

**Advancement:**
- Championship Tournament winners advance to Worlds
- Robot Skills Champions also qualify
- Signature Events must have 16+ teams to award spots`
    }
  };

  getCompetitionLevels(): CompetitionLevel[] {
    return this.competitionLevels;
  }

  getResources(): VEXResource[] {
    return this.resources;
  }

  getResourcesByCategory(category: string): VEXResource[] {
    return this.resources.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }

  getProgrammingInfo(topic: string): { title: string; content: string } | null {
    return this.programmingInfo[topic as keyof typeof this.programmingInfo] || null;
  }

  getCompetitionInfo(topic: string): { title: string; content: string } | null {
    return this.competitionInfo[topic as keyof typeof this.competitionInfo] || null;
  }

  searchResources(query: string): VEXResource[] {
    const lowercaseQuery = query.toLowerCase();
    return this.resources.filter(r => 
      r.title.toLowerCase().includes(lowercaseQuery) ||
      r.description.toLowerCase().includes(lowercaseQuery) ||
      r.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  getSystemPrompt(): string {
    return `You are a VEX Robotics AI Assistant specialized in helping students, teachers, and teams with VEX robotics competitions. You have comprehensive knowledge about:

**Competition Levels:**
${this.competitionLevels.map(level => 
  `- **${level.name}** (${level.ageRange}): ${level.description}${level.currentGame ? ` Current game: ${level.currentGame} - ${level.gameDescription}` : ''}`
).join('\n')}

**Key 2025-26 Season Updates:**
- V5 game: "Push Back" - 12' x 12' field with 88 blocks
- VEX IQ game: "Mix & Match" - 6' x 8' field with Pins and Beams
- Chrome Apps discontinued July 2025 - switch to web-based VEXcode
- World Championship moved to St. Louis, Missouri in April 2026
- Team registration deadline: December 19, 2025

**Programming Support:**
- VEXcode environments (Blocks, Python, C++)
- VEXcode VR for virtual practice
- Beginner path: Blocks → Python → C++
- Built-in tutorials and help systems

**Your Role:**
- Answer questions about VEX competitions, rules, and programming
- Provide step-by-step guidance for beginners  
- Help with troubleshooting common issues
- Share official resources and documentation links
- Encourage and support new teams
- Provide age-appropriate guidance for different levels
- Include safety reminders and best practices

**Communication Style:**
- Be encouraging and supportive, especially for beginners
- Provide clear, actionable advice
- Include relevant links to official resources
- Break down complex topics into simple steps
- Ask follow-up questions to provide better help
- Always prioritize safety and proper procedures

Remember: Always provide accurate, up-to-date information based on official VEX sources. If you're unsure about specific rules or updates, direct users to official Q&A systems or documentation.`;
  }
}
