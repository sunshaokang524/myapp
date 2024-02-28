/**
 * 获取图片
 */
export function getImg(url:string):string{
    return 'http://192.168.0.2:5000/'+url
}
/***
 * 处理时间
 */
export function getTime(date:any){
    const inputDate:any = new Date(date);  
    if (isNaN(inputDate)) {  
      return "无效的日期时间字符串";  
    }  
    
    const now:any = new Date();  
    const diff = now - inputDate;  
    
    if (diff < 0) {  
      return "日期时间在未来";  
    } else if (diff < 60 * 1000) {  
      // Less than 1 minute  
      return "刚刚";  
    } else if (diff < 60 * 60 * 1000) {  
      // Less than 1 hour  
      const minutes = Math.floor((diff / (1000 * 60))) % 60;  
      return `${minutes}分钟前`;  
    } else if (  
      now.getFullYear() === inputDate.getFullYear() &&  
      now.getMonth() === inputDate.getMonth() &&  
      now.getDate() === inputDate.getDate()  
    ) {  
      // Same day  
      const hours = Math.floor((diff / (1000 * 60 * 60))) % 24;  
      return `${hours}小时前`;  
    } else {  
      // Different day  
      return inputDate.toLocaleString();  
    }  
}