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
      gameDescription: "2025-26 game played on 6' x 8' rectangular field. Teams compete in 60-second Teamwork Challenge and Robot Skills Challenge. Primary objectives: build Stacks out of Pins and Beams, place Stacks in Goals. Scoring based on connected pieces, color diversity, and goal matching."
    },
    {
      name: "VEX V5",
      ageRange: "Middle & High School",
      description: "Premier competition for middle and high school students using VEX V5 robots.",
      currentGame: "Push Back",
      gameDescription: "2025-26 game played on 12' x 12' square field with 88 blocks, 4 Goals (2 Long Goals, 2 Center Goals), and 2 Park Zones. 15-second autonomous + 1:45 driver control. Score by placing blocks in goals, controlling zones, clearing loaders, and parking robots."
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

  private gameManuals = {
    v5PushBack: {
      title: "VEX V5 Push Back 2025-26 - Official Game Manual",
      content: `**OFFICIAL VEX V5 PUSH BACK GAME RULES (2025-26 Season):**

**Game Overview:**
- Field: 12' x 12' square field
- Match Duration: 15-second Autonomous + 1:45 Driver Control
- Teams: 2 alliances (red/blue) with 2 teams each
- Game Elements: 88 Blocks, 4 Goals (2 Long Goals, 2 Center Goals), 2 Park Zones

**OFFICIAL SCORING (from Game Manual):**
- **Each Block Scored in Goal:** 3 points
- **Autonomous Bonus:** 10 points (alliance with higher autonomous score)
- **Each Controlled Zone in Long Goal:** 10 points
- **Controlled Center Goal - Upper:** 8 points
- **Controlled Center Goal - Lower:** 6 points
- **1 Parked Alliance Robot:** 8 points
- **2 Parked Alliance Robots:** 30 points

**Key Game Objectives:**
1. Score Blocks in Goals (3 points each)
2. Control zones within Goals
3. Clear Loaders
4. Park robots in defined zones at match end

**Official Resources:**
- Game Manual: https://link.vex.com/docs/25-26/v5rc-pushback-manual
- Q&A System: https://www.robotevents.com/V5RC/2025-2026/QA
- Field Assembly: https://link.vex.com/docs/25-26/v5rc-pushback-bi
- Hero Robot "Dex": https://link.vex.com/docs/25-26/push-back-dex-BI

**Important Notes:**
- Game manuals are updated throughout the season
- Monitor VEX Forum for Push Back and Official Q&A for updates
- English PDF Game Manual takes precedence over all other materials`
    },
    iqMixMatch: {
      title: "VEX IQ Mix & Match 2025-26 - Official Game Manual", 
      content: `**OFFICIAL VEX IQ MIX & MATCH GAME RULES (2025-26 Season):**

**Game Overview:**
- Field: 6' x 8' rectangular field
- Formats: Teamwork Challenge (60 seconds) + Robot Skills Challenge
- Game Elements: Pins (116mm tall cylinders) and Beams (251mm × 124mm × 50mm rectangles)

**OFFICIAL SCORING (from Game Manual):**
- **Each Connected Pin:** 1 point
- **Each Connected Beam:** 10 points
- **Each 2-color Stack:** 5-point bonus
- **Each 3-color Stack:** 15-point bonus
- **Stack in Matching Goal + Connected to Beam:** 10-point bonus
- **Each Stack on Standoff Goal:** 10-point bonus
- **Each Cleared Starting Pin:** 2 points
- **Robot touching Scoring Objects at end:** 2 points

**Key Game Objectives:**
1. Build Stacks out of Pins and Beams
2. Place Stacks in Goals (Triangle Goals, Square Goals, Standoff Goals)
3. Maximize color diversity in stacks
4. Match stack bottom Pin color with Goal color
5. Use Beams as "wild cards" (worth 10 points each)

**Competition Formats:**
- **Teamwork Challenge:** Two robots collaborate for 60 seconds
- **Robot Skills Challenge:** 
  - Driving Skills (60 seconds, driver controlled)
  - Autonomous Coding Skills (60 seconds, autonomous)

**Field Elements:**
- Triangle Goals (green), Square Goals (yellow)
- Starting Pin Supports (blue)
- Floor Goal and Standoff Goal (purple)
- Load Zones (pink) - for human team members to introduce extra Pins

**Official Resources:**
- Game Manual PDF: https://link.vex.com/docs/25-26/viqrc-mixandmatch-manual
- Game Manual HTML: https://www.vexrobotics.com/mix-and-match-manual
- Q&A System: https://www.robotevents.com/VIQRC/2025-2026/QA (opens May 27, 2025)
- Field Assembly: https://link.vex.com/docs/25-26/viqrc-mixandmatch-bi
- Hero Robot "Huey": https://link.vex.com/docs/25-26/mix-and-match-huey-BI

**Important Scoring Notes:**
- Single game objects are worth 0 points - must be stacked to score
- Beams act as wild cards and contribute 10 points when part of a stack
- Color diversity bonuses reward mixed-color stacks
- Game emphasizes collaboration and execution-based challenges`
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

  getGameManualInfo(topic: string): { title: string; content: string } | null {
    return this.gameManuals[topic as keyof typeof this.gameManuals] || null;
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
    return `You are a VEX Robotics AI Assistant specialized in helping students, teachers, and teams with VEX robotics competitions. You have access to the OFFICIAL 2025-26 game manuals and comprehensive knowledge about:

**Competition Levels:**
${this.competitionLevels.map(level => 
  `- **${level.name}** (${level.ageRange}): ${level.description}${level.currentGame ? ` Current game: ${level.currentGame} - ${level.gameDescription}` : ''}`
).join('\n')}

**OFFICIAL 2025-26 GAME RULES (from Current Game Manuals):**

**VEX V5 Push Back - OFFICIAL SCORING:**
- Each Block Scored in Goal: 3 points
- Autonomous Bonus: 10 points (alliance with higher autonomous score)
- Each Controlled Zone in Long Goal: 10 points
- Controlled Center Goal - Upper: 8 points
- Controlled Center Goal - Lower: 6 points
- 1 Parked Alliance Robot: 8 points
- 2 Parked Alliance Robots: 30 points
- Field: 12' x 12' with 88 blocks, 4 Goals (2 Long, 2 Center), 2 Park Zones
- Match: 15-second autonomous + 1:45 driver control

**VEX IQ Mix & Match - OFFICIAL SCORING:**
- Each Connected Pin: 1 point
- Each Connected Beam: 10 points
- Each 2-color Stack: 5-point bonus
- Each 3-color Stack: 15-point bonus
- Stack in Matching Goal + Connected to Beam: 10-point bonus
- Each Stack on Standoff Goal: 10-point bonus
- Each Cleared Starting Pin: 2 points
- Robot touching Scoring Objects at end: 2 points
- Field: 6' x 8' with Pins and Beams
- Formats: 60-second Teamwork Challenge + Robot Skills Challenge

**Official Game Manual Resources:**
- V5 Push Back Manual: https://link.vex.com/docs/25-26/v5rc-pushback-manual
- VEX IQ Mix & Match Manual: https://link.vex.com/docs/25-26/viqrc-mixandmatch-manual
- V5 Q&A: https://www.robotevents.com/V5RC/2025-2026/QA
- VEX IQ Q&A: https://www.robotevents.com/VIQRC/2025-2026/QA

**Your Role:**
- Answer questions using OFFICIAL game manual information when relevant
- Reference specific scoring rules and point values from official manuals
- Provide step-by-step guidance for beginners
- Help with troubleshooting common issues
- Share official resources and documentation links
- Encourage and support new teams
- Always cite official sources when discussing rules
- Direct users to official Q&A systems for rule clarifications

**Communication Style:**
- Be encouraging and supportive, especially for beginners
- When discussing rules, always reference the official game manual
- Provide exact scoring values from official sources
- Include relevant links to official resources
- Break down complex topics into simple steps
- Ask follow-up questions to provide better help
- Always prioritize safety and proper procedures

**CRITICAL:** When answering questions about game rules, scoring, or field elements, always reference the official 2025-26 game manuals. Use exact point values and rule descriptions from the official sources. If asked about specific rules not covered in your knowledge, direct users to the official Q&A systems.

Remember: The English PDF Game Manual takes precedence over all other materials. Game manuals are updated throughout the season - always advise users to monitor official channels for updates.`;
  }
}
