import { useEffect } from 'react';
import { useHabits } from '../hooks/useHabits';

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const ReminderService: React.FC = () => {
    const { userData } = useHabits();
    const { habits } = userData;

    useEffect(() => {
        if (Notification.permission !== 'granted') {
            return;
        }

        const checkReminders = () => {
            const now = new Date();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const today = getTodayDateString();

            habits.forEach(habit => {
                const isCompletedToday = habit.lastCompleted === today;
                if (habit.reminderTime === currentTime && !isCompletedToday) {
                    new Notification('Habit Bloom Reminder 🌿', {
                        body: `Time for your habit: "${habit.name}"`,
                    });
                }
            });
        };

        const intervalId = setInterval(checkReminders, 60000); // Check every minute

        return () => clearInterval(intervalId);
    }, [habits]);

    return null; // This is a service component, it doesn't render anything
};

export default ReminderService;
