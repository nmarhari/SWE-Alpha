### Product Proposal - SWE Team Alpha
**1. Introduction**
   - The Floor is Lava
   - Proposal prepared by:  Brandon Scholten, Cohen Stevens, Cole Kaminski, Emma Magyarics, Esha Soni, Forest Lang, Hadj Ahmed, Nassim Marhari, Philip Sarbiewski, Tristan Besser, Yug Patel
   - 2/10/2024

**2. Executive Summary**
   - Our team aims to bring to life the childhood game "The Floor is Lava"  as a new digital experience.
   - Our product is an exhilarating 3D experience in which the player must 
       successfully navigate a changing environment as the floor turns to lava. 
       
       The project aims to provide a novel and enjoyable experience for users who
       are looking for a leisure activity.

   - As the player progresses in the game, the obstacles increase in difficulty, and the time that the player has to finish the challenge decreases.

**3. Product Vision**
   - **Purpose of the Product**: The product is an online web-hosted game intended as a relaxing and pleasant use of time on the internet.

   - **Target Audience**: Our game is targeted towards internet users of all ages, providing them with a novel digital experience.

   - **Long-term Vision**: 
   In the long term, we want our product to be a viable, free, and enjoyable way to spend time on the internet.

**4. Product Value**
   - **Benefits**: 
     - The key benefits for the stakeholders would be a commercial-grade product at the end of Software Engineering (CS 33901, Spring 2024), representing the collective efforts of Team Alpha.
     - A commercial-grade game, publically available to any burnt-out university student who needs a break.
     - A novel gaming experience for our professor, Dr. Greg Delozier.
   
   - **Cost Analysis**: 
     - We estimate that there would be no monetary cost involved in the creation and maintenance processes. 
     - The only cost would be in terms of the time and efforts of the stakeholders and the developers working on the game. Each developer should spend roughly 1-2 hours per week working on the project.

   - **Value Proposition**: 
     - A one of a kind, commercial-grade project experience for all the stakeholders.
     - Participation in industry-level SCRUM meetings and group contributions by each member on an individual level.
     - Meaningful stories and experiences to show in behavioral interview questions in computer science or general technology internships and jobs.
     - Therefore, we believe the return on investment is worth the cost of the team's collective time and effort.
     - Team members will have a published example of their technical skills being demonstrated in a team setting.

**5. Product Creation Outline**
   - **Design Overview**  
      - The game takes place in a structure built in 3D space, which the player must escape.
      - The parts of the structure change texture (turn into lava) and become dangerous to the player.
      - When the player touches lava, they will lose health and eventually die.
      - As the player progresses through the game, the terrain will get harder to navigate.
      - If the player escapes the structure, they are placed into a new dynamically generated structure
        that fills with lava. The process repeats until the player loses. 
      - A score is recorded and kept track of in a text file or database. 
   - **Development Plan**: 
     - Key milestones
       - Design and implementation of the start screen
       - Player moves in 3D space with multiple structures to navigate
       - Parts of the structure randomly turn to lava during gameplay
       - Implementation of the player health system 
         - Keep track of player health
         - Player takes damage when they touch lava
         - Death screen
       - Design and implementation of a tutorial overlay
       - Random generation of structures
       - Gameplay increases in difficulty over time
     - Not Key Milestones
       - A relatively accurate recreation of the Mathematical Sciences Building
       - Creation and implementation of a story about saving information from the lava
       - Creation and implementation of a soundtrack
       - Creation and implementation of sound effects
     - Development Process
       0. Issues should be created relating to the bullet points above
       1. On each sprint, features should be picked from the milestones above for the week
       2. Each group member should be assigned at least one feature to work on
          - Possible exception for those in charge of documentation for the week
          - One person should not get stuck with all the documentation
       3. Each feature should go through the following process before being considered "Done"
          - Planning, drawing user interaction diagrams, psuedocode, etc
          - Implementation of the feature
          - Thoroughly testing the feature
          - Code review (during Sunday meetings at 7:00PM)
            - Branches are merged into the main branch during this time. 
            - New features and issues should also be addressed during this time
   - **Development Methodology**: 
     - SCRUM, as a form of Agile, will be the chosen engineering methodology.
     - Sprint Kanbans on GitHub projects will be the collective choice to implement and deploy user stories.
   - **Resource Requirements**: 
     - The team would be using Visual Studio Code as our development environment, with GitHub as the version control system.
     - The team will use personal laptops or computers with a decent internet connection to develop in conjunction with Discord to communicate.

**6. Quality and Evaluation**
   - **Quality Standards**: 
     - The product should be playable on relatively low-spec hardware
       - use less than 4GB of the user's memory
       - framerate should not drop below 30 fps (This can be measured in p5.js using the frameRate() function with no arguments)
     - controls should be intuitive unless they are for a unique feature (ex: using WASD keys for movement)
   - **Testing Procedures**: 
     - Apart from user-oriented testing, automated testing files would be used by the team to perform test-driven development adhering to the instructor's guidelines. 
     - Our team will use test-driven development to mitigate bugs in our code early on in development.
   - **Evaluation Metrics**:
     - The final product would be evaluated by the instructor's guidelines for the course along with the collective vision of the team to provide an engaging gaming experience to our target audience. 
     - Users would be guaranteed a quality experience on the basis of various kinds of testing mechanisms, including but not limited to:
       - _Combinatorial Evaluation_ to monitor gameplay options
       - _Ad Hoc Evaluation_ for edge cases
       - _Compatibility Evaluation_ for a uniform experience across devices.
       - _Play Evaluation_ to ensure smooth game flow.

**7. Deployment Plans**
   - **Automation and Mechanisms**: 
     - "The Floor is Lava" will be hosted as a web application, utilizing GitHub Pages.
     - The main branch of our GitHub repository will serve as our production environment 
     - Users will be able to access the page from any commonly used browser, assuming they have an internet connection
     - Features will be deployed once they have been tested and deemed safe to merge with the main branch

   - **Production Timeline**: 
     - As mentioned above, milestone deployments would take place at least once each week in order to maintain.
     - New features, graphics, user capabilities, and game modes would be integrated and deployed each week according to what our team has chosen to put on the "To do" list for this week.
   - **User Training**: Describe how users will be trained to use the product, if necessary.
     - To ensure a refined user experience, a tutorial would be made optional for anyone new to the product environment.
     - This includes an _easy mode/Dr. D Mode_ for getting familiar with the game and even finishing the game if the user wishes to do so. 
   - **Marketing and Distribution Strategy**: 
     - The product would not be commercially marketed on any platform unless feasible.
     - The product will be presented to the class, and the GitHub Pages link may be distributed via instant messaging services such as Discord.
     - Potential users would be informed of the newest deployments via word-of-mouth or email announcements, either in-class or outside.
     - The team may decide to purchase a more recognizable domain to point the project to.
   - **Risk Management**: 
     - To mitigate the negative effects of scope creep, our team will make use of user stories in each iteration cycle and prioritize features according to the product owner.
     - Technical issues would be mitigated with continuous testing, especially play testing.
     - Team and interpersonal issues would be remedied with feedback from the Scrum Master and with dedicated practice of the team's collective vision.

**8. Maintenance Plans**
   - **Defects:** 
     - Bugs discovered after deployment should be added as issues and placed on the "To do" list for future sprints. 
   - **Evolution:** 
     - The stakeholders expect all major deployments of the product to be made by the end of the first week of May, along with any product packaging, documentation, and code releases.
     - If any of the stakeholders wish to integrate additional features or code releases, they are free to do so.

**9. Conclusion**
   - Overall, "The Floor is Lava" project is an exciting endeavor that will push the limits of P5JS. With strategic planning, a clear vision, and quality in mind, Team Alpha is dedicated to delivering an exceptional experience. We appreciate the opportunity to contribute to further projects in P5JS and captivate our audience. 

**10. Appendices**
   - N/A

**11. References**
   - N/A
