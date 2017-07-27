import User from '../models/user';

// метод получения пользователя по токену
export async function getUserByToken(token) {
	const { _id } = token;

	try {
		var user = await User.findOne({ _id }, { password: 0 });
	} catch (e) {
		throw e;
	}

	return user;
} 