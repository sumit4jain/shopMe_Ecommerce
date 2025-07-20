// // Add your API key here.
// // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
// const GEMINI_API_KEY = ""; 

// export const handleGenerateDescription = async (newTask, setNewTask, showNotification) => {
//   if (!newTask.title.trim()) {
//     showNotification('Please enter a task title to generate a description.', 'error');
//     return false;
//   }

//   try {
//     const prompt = `Based on the task title "${newTask.title}" and current description (if any): "${newTask.description}", generate a more detailed and comprehensive description for this task. Focus on clarity, actionable steps, and relevant context. Keep it concise but informative.`;
    
//     let chatHistory = [];
//     chatHistory.push({ role: "user", parts: [{ text: prompt }] });
//     const payload = { contents: chatHistory };
//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     });
    
//     const result = await response.json();
    
//     if (result.candidates && result.candidates.length > 0 &&
//         result.candidates[0].content && result.candidates[0].content.parts &&
//         result.candidates[0].content.parts.length > 0) {
//       const text = result.candidates[0].content.parts[0].text;
//       setNewTask(prev => ({ ...prev, description: text }));
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('Error generating description:', error);
//     return false;
//   }
// };

// export const handleSuggestTags = async (newTask, setNewTask, showNotification) => {
//   if (!newTask.title.trim() && !newTask.description.trim()) {
//     showNotification('Please enter a task title or description to suggest tags.', 'error');
//     return false;
//   }

//   try {
//     const prompt = `Based on the task title "${newTask.title}" and description "${newTask.description}", suggest up to 5 relevant keywords or tags. Provide them as a comma-separated list. Example: "urgent, marketing, bug"`;
    
//     let chatHistory = [];
//     chatHistory.push({ role: "user", parts: [{ text: prompt }] });
//     const payload = {
//         contents: chatHistory,
//         generationConfig: {
//             responseMimeType: "application/json",
//             responseSchema: {
//                 type: "ARRAY",
//                 items: { "type": "STRING" }
//             }
//         }
//     };
//     const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
    
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload)
//     });
    
//     const result = await response.json();
    
//     if (result.candidates && result.candidates.length > 0 &&
//         result.candidates[0].content && result.candidates[0].content.parts &&
//         result.candidates[0].content.parts.length > 0 &&
//         result.candidates[0].content.parts[0].text) {
//       const jsonString = result.candidates[0].content.parts[0].text;
//       const parsedTags = JSON.parse(jsonString);
      
//       if (Array.isArray(parsedTags) && parsedTags.every(tag => typeof tag === 'string')) {
//         const currentTags = newTask.tags.split(',').map(tag => tag.trim()).filter(Boolean);
//         const newTags = [...new Set([...currentTags, ...parsedTags])];
//         setNewTask(prev => ({ ...prev, tags: newTags.join(', ') }));
//         return true;
//       } else {
//         return false;
//       }
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error('Error suggesting tags:', error);
//     return false;
//   }
// };